const { reduceModel, createList } = require("./utils");
module.exports = {
  initActions: function (mls, element_name) {
    let self = this;
    let model;
    let actions;
    switch (mls) {
      case "MLS":
        model = "MLS10000";
        element_name = element_name.trim();
        actions = self.actions;
        break;
      case "Satellite":
        model = "SATELLITEHIGHLITE4K";
        element_name = element_name.trim();
        actions = self.actions;
        break;
      default:
        model = self.config.model.toUpperCase();
        element_name = "";
        actions = {};
        break;
    }

    //Create automatically an action for each type of command
    let reducedModel = reduceModel(model, self);
    if (reducedModel) {
      reducedModel.forEach((command) => {
        if (command.Settings.toString().includes("?")) {
          let list = createList(command);
          //Search for "dropdownList" commands
          if (list.length > 0) {
            actions[command.Name] = {
              name: command.Name,
              description: "Category: " + command.Category + ", Type: Dropdown",
              options: [
                {
                  type: "dropdown",
                  id: "id_" + command.Name,
                  label: command.Name,
                  choices: list,
                  default: list[0].id,
                  useVariables: true,
                },
              ],
              callback: async (action) => {
                let value = await self.parseVariablesInString(
                  action.options["id_" + command.Name]
                );
                let arg = command.CmdStr;
                if (value != "") {
                  if (
                    self.tcpSocket !== undefined &&
                    self.tcpSocket.isConnected
                  ) {
                    self.sendCommand(Buffer.from(arg + " = " + value));
                  } else {
                  }
                }
              },
            };
          }
          //Search for "Range" commands
          else if (
            command.Settings.includes("?=+-") &&
            command.min !== "" &&
            command.max !== "" &&
            command.Name !== ""
          ) {
            let basename = command.Name;
            actions[command.Name] = {
              name: command.Name,
              description:
                "Category: " +
                command.Category +
                ", Type: Number from " +
                command.min +
                " to " +
                command.max,
              options: [
                {
                  type: "checkbox",
                  id: basename,
                  label: "checked = send command / unchecked = send value",
                  default: true,
                  useVariables: true,
                },
                {
                  type: "dropdown",
                  id: basename + " command",
                  label: basename + " command",
                  choices: [
                    { id: 0, label: "-- Select Command --" },
                    { id: "+", label: "increment" },
                    { id: "-", label: "decrement" },
                    { id: "#", label: "reset to default" },
                  ],
                  default: 0,
                  useVariables: true,
                  isVisibleData: { basename: basename },
                  isVisible: (options, isVisibleData) =>
                    options[isVisibleData.basename] === true,
                },
                {
                  type: "number",
                  id: basename + " value",
                  label: basename + " value",
                  min: command.min,
                  max: command.max,
                  step: 1,
                  range: true,
                  default: Math.round((command.min + command.max) / 2),
                  useVariables: true,
                  isVisibleData: { basename: basename },
                  isVisible: (options, isVisibleData) =>
                    options[isVisibleData.basename] === false,
                },
              ],
              callback: async (action) => {
                let choice = await self.parseVariablesInString(
                  action.options[basename]
                );
                let value = await self.parseVariablesInString(
                  action.options[basename + " value"]
                );
                let commandChoice = await self.parseVariablesInString(
                  action.options[basename + " command"]
                );
                if (value != "" && commandChoice != "") {
                  if (choice === "false") {
                    if (
                      self.tcpSocket !== undefined &&
                      self.tcpSocket.isConnected
                    ) {
                      self.sendCommand(
                        Buffer.from(command.CmdStr + " = " + value)
                      );
                    } else {
                    }
                  } else if (choice === "true") {
                    if (
                      self.tcpSocket !== undefined &&
                      self.tcpSocket.isConnected
                    ) {
                      self.sendCommand(
                        Buffer.from(command.CmdStr + " " + commandChoice)
                      );
                      setTimeout(() => {
                        self.sendCommand(Buffer.from(command.CmdStr + " ?"));
                      }, 1000);
                    } else {
                    }
                  }
                }
              },
            };
          }
        }
        //Search for "Simple" commands
        else if (command.Settings === "") {
          actions[command.Name] = {
            name: command.Name,
            description: "Category: " + command.Category + ", Type: Execute",
            options: [
              {
                type: "static-text",
                id: "id_" + command.Name,
                label: command.Name,
                value: command.CmdStr,
                useVariables: true,
              },
            ],
            callback: async () => {
              if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
                self.sendCommand(Buffer.from(command.CmdStr));
              } else {
              }
            },
          };
        }
      });
    }
    //Generic Command to send requests not listed in constants
    actions["send"] = {
      name: "Send Command",
      description: "Category:  Generic, Type: String",
      options: [
        {
          type: "textinput",
          id: "id_send",
          label: "Send Command:",
          tooltip:
            "example : '*input.select = 0' \nRead Digital Projection relative protocols documentation \nfor available commands",
          default: "",
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const cmd = unescape(
          await self.parseVariablesInString(action.options.id_send)
        );

        if (cmd != "") {
          /*
           * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
           * sending a string assumes 'utf8' encoding
           * which then escapes character values over 0x7F
           * and destroys the 'binary' content
           */
          const sendBuf = Buffer.from(cmd);

          if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
            self.sendCommand(sendBuf);
          } else {
            self.log("debug", "tcpSocket not connected :(");
          }
        }
      },
    };
    self.actions = actions;
    self.setActionDefinitions(actions);
  },
};
