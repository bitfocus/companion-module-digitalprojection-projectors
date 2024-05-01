const { combineRgb } = require("@companion-module/base");
const actions = require("./actions");

module.exports = {
  initPresets: function () {
    let self = this;
    let presets = [];

    let model = self.config.model.toUpperCase();
    let instanceId = self.label;

    self.log("debug", "instanceId: " + instanceId);
    if (self[model] !== undefined) {
      self[model].forEach((command) => {
        let variableId = "";
        if (!command.Name.includes("xxx")) {
          if (command.Settings.toString().includes("?")) {
            if (command.CmdStr.includes(".")) {
              variableId = command.CmdStr.split(".");
              if (variableId.length === 2) {
                variableId = variableId[0] + "_" + variableId[1];
              } else if (variableId.length === 3) {
                variableId =
                  variableId[0] + "_" + variableId[1] + "_" + variableId[2];
              }
            } else {
              variableId = command.CmdStr;
            }

            if (variableId !== "") {
              if (
                command.Settings.toString().includes("?") &&
                !command.Name.includes("xxx") &&
                command.Name !== ""
              ) {
                let dataKeys = [];
                let previousDataValueWasEmpty = true;
                let list = [];
                dataKeys = Object.keys(command).filter((key) =>
                  key.startsWith("data")
                );
                for (let i = dataKeys.length - 1; i >= 0; i--) {
                  let dataKey = dataKeys[i];
                  let dataValue = command[dataKey];
                  if (dataValue !== "") {
                    list[i] = { id: i, label: dataValue };
                    previousDataValueWasEmpty = false;
                  } else if (!previousDataValueWasEmpty) {
                    list[i] = { id: i, label: "" };
                    previousDataValueWasEmpty = true;
                  }
                }
                //Search for "dropdown" commands
                if (list.length > 0) {
                  //Dropdown presets
                  self.log("debug", "adding dropdown preset: " + command.Name);
                  presets.push({
                    type: "button",
                    category: command.Category,
                    name: command.Name,
                    style: {
                      //text: command.Name,
                      text:
                        "concat('" +
                        command.Name +
                        "' ,$(" +
                        instanceId +
                        ":" +
                        variableId +
                        "))",
                      textExpression: true,
                      size: "14",
                      color: "16777215",
                      bgcolor: combineRgb(0, 0, 0),
                    },
                    steps: [
                      {
                        down: [
                          {
                            actionId: command.Name,
                          },
                        ],
                        up: [],
                      },
                    ],
                  });
                } else if (
                  command.Settings.includes("?=+-") &&
                  command.min !== "" &&
                  command.max !== "" &&
                  command.Name !== ""
                ) {
                  //Range presets
                  self.log("debug", "adding range preset: " + command.Name);
                  presets.push({
                    type: "button",
                    category: command.Category,
                    name: command.Name,
                    style: {
                      //text: command.Name,
                      text:
                        "concat('" +
                        command.Name +
                        "' ,$(" +
                        instanceId +
                        ":" +
                        variableId +
                        "))",
                      textExpression: true,
                      size: "14",
                      color: "16777215",
                      bgcolor: combineRgb(0, 0, 0),
                    },
                    steps: [
                      {
                        down: [
                          {
                            actionId: command.Name,
                          },
                        ],
                        up: [],
                      },
                    ],
                  });
                }
              } else if (
                !command.Name.includes("xxx") &&
                command.Settings === "" &&
                command.Name !== ""
              ) {
                presets.push({
                  type: "button",
                  category: command.Category,
                  name: command.Name,
                  style: {
                    //text: command.Name,
                    text:
                      "concat('" +
                      command.Name +
                      "' ,$(" +
                      instanceId +
                      ":" +
                      variableId +
                      "))",
                    textExpression: true,
                    size: "14",
                    color: "16777215",
                    bgcolor: combineRgb(0, 0, 0),
                  },
                  steps: [
                    {
                      down: [
                        {
                          actionId: command.Name,
                        },
                      ],
                      up: [],
                    },
                  ],
                });
              }
            }
          } else if (
            command.Settings.includes("?=+-") &&
            command.min !== "" &&
            command.max !== "" &&
            command.Name !== ""
          ) {
            presets.push({
              type: "button",
              category: command.Category,
              name: command.Name,
              style: {
                //text: command.Name,
                text: command.Name,
                textExpression: true,
                size: "14",
                color: "16777215",
                bgcolor: combineRgb(0, 0, 0),
              },
              steps: [
                {
                  down: [
                    {
                      actionId: command.Name,
                    },
                  ],
                  up: [],
                },
              ],
            });
          } else if (
            !command.Name.includes("xxx") &&
            command.Settings === "" &&
            command.Name !== ""
          ) {
            self.log("debug", "adding execute button preset: " + command.Name);
            presets.push({
              type: "button",
              category: command.Category,
              name: command.Name,
              style: {
                //text: command.Name,
                text: command.Name,
                //textExpression: true,
                size: "14",
                color: "16777215",
                bgcolor: combineRgb(0, 0, 0),
              },
              steps: [
                {
                  down: [
                    {
                      actionId: command.Name,
                    },
                  ],
                  up: [],
                },
              ],
            });
          }
        }
      });
    }

    //    for (let i in self.REQUESTS) {
    //      //Range presets
    //      if (self.REQUESTS[i].type === "range") {
    //        let basename = self.REQUESTS[i].id.replace(/\./g, "_");
    //        let presetAction = self.REQUESTS[i].id.replace(/\./g, " ");
    //        let presetName = "Status of " + basename;
    //        let presetText =
    //          "concat('" +
    //          basename +
    //          ": ',$(Digital_Projection-MLS:" +
    //          basename +
    //          "))";
    //        presets.push({
    //          type: "button",
    //          category: "Info",
    //          name: presetName,
    //          style: {
    //            text: presetText,
    //            textExpression: true,
    //            size: "14",
    //            color: "16777215",
    //            bgcolor: combineRgb(0, 0, 0),
    //          },
    //          steps: [
    //            {
    //              down: [
    //                {
    //                  actionId: presetAction,
    //                },
    //              ],
    //              up: [],
    //            },
    //          ],
    //        });
    //      }
    //    }

    self.setPresetDefinitions(presets);
  },
};
