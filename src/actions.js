module.exports = {
  initActions: function () {
    let self = this;
    let actions = {};

    //    actions["test"] = {
    //      name: "test",
    //      options: [
    //        {
    //          type: "checkbox",
    //          id: "test",
    //          label: "test",
    //          default: false,
    //        },
    //        {
    //          type: "checkbox",
    //          id: "test2",
    //          label: "test2",
    //          default: false,
    //          isVisible: (options) => options.test,
    //        },
    //      ],
    //      callback: async (action) => {
    //        self.log("debug", "test");
    //      },
    //    };

    //Create automatically an action if Constant exists as a dropdown list
    for (let i in self) {
      if (i === i.toUpperCase() && i !== "REQUESTS") {
        let list = [];
        for (let j in self[i]) {
          list.push({ id: j, label: self[i][j].label });
        }
        actions[i] = {
          name: i.toLowerCase().replace("_", " "),
          options: [
            {
              type: "dropdown",
              id: "id_" + i,
              label: i.toLowerCase().replace("_", " "),
              choices: list,
              default: list[0].id,
              useVariables: true,
            },
          ],
          callback: async (action) => {
            let value = await self.parseVariablesInString(
              action.options["id_" + i]
            );
            let arg = "*" + i.toLowerCase().replace(/_/g, ".");
            if (value != "") {
              if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
                self.log(
                  "debug",
                  "sending to " + self.config.host + ": *" + arg + "=" + value
                );
                self.sendCommand(Buffer.from(arg + "=" + value));
              } else {
                self.log("debug", "tcpSocket not connected :(");
              }
            }
          },
        };
      }
    }

    ///Create automatically an action if REQUEST exists as a range or a function
    for (let i in self.REQUESTS) {
      //start with range
      if (self.REQUESTS[i].type === "range") {
        let basename = self.REQUESTS[i].id.replace(/\./g, " ");
        self.log("debug", "request as range exists : " + basename);
        actions[basename] = {
          name: basename,
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
              id: basename + " command ",
              label: basename + " command ",
              choices: [
                { id: 0, label: "-- Select Command --" },
                { id: "+", label: "increment" },
                { id: "-", label: "decrement" },
                { id: "#", label: "reset to default" },
              ],
              default: 0,
              useVariables: true,
              isVisible: () => {
                options.basename === "true";
              },
            },
            {
              type: "number",
              id: basename + " value",
              label: basename + " value",
              min: self.REQUESTS[i].range[0],
              max: self.REQUESTS[i].range[1],
              step: 1,
              range: true,
              //step: self.REQUESTS[i].step,
              default: 0,
              useVariables: true,
              isVisible: () => {
                options.basename === "true";
              },
            },
          ],
          callback: async (action) => {
            let choice = await self.parseVariablesInString(
              action.options[basename]
            );
            self.log("debug", "choice : " + choice);
            let value = await self.parseVariablesInString(
              action.options[basename + " value"]
            );
            let command = await self.parseVariablesInString(
              action.options[basename + " command "]
            );
            switch (command) {
              case "+":
                command = "+";
                break;
              case "-":
                command = "-";
                break;
              case "#":
                command = "#";
                break;
            }
            if (value != "" && command != "") {
              if (choice === "false") {
                if (
                  self.tcpSocket !== undefined &&
                  self.tcpSocket.isConnected
                ) {
                  self.log(
                    "debug",
                    "sending to " +
                      self.config.host +
                      ": *" +
                      self.REQUESTS[i].id +
                      "=" +
                      value
                  );
                  self.sendCommand(
                    Buffer.from("*" + self.REQUESTS[i].id + "=" + value)
                  );
                } else {
                  self.log("debug", "tcpSocket not connected :(");
                }
              } else if (choice === "true") {
                if (
                  self.tcpSocket !== undefined &&
                  self.tcpSocket.isConnected
                ) {
                  self.log(
                    "debug",
                    "sending to " +
                      self.config.host +
                      ": *" +
                      self.REQUESTS[i].id +
                      "=" +
                      command
                  );
                  self.sendCommand(
                    Buffer.from(
                      "*" + self.REQUESTS[i].id + " " + command + "\r"
                    )
                  );
                  setTimeout(() => {
                    self.sendCommand(
                      Buffer.from("*" + self.REQUESTS[i].id + " = ?\r")
                    );
                  }, 1000);
                } else {
                  self.log("debug", "tcpSocket not connected :(");
                }
              }
            }
          },
        };
      } else if (self.REQUESTS[i].type === "function") {
        self.log(
          "debug",
          "request as function exists : " +
            self.REQUESTS[i].id.replace(/\./g, " ")
        );
        actions[self.REQUESTS[i].id.replace(/\./g, " ")] = {
          name: self.REQUESTS[i].id.replace(/\./g, " "),
          options: [
            {
              type: "static-text",
              id: "id_" + self.REQUESTS[i].id.replace(/\./g, "_"),
              label: self.REQUESTS[i].id.replace(/\./g, " "),
              value: "send command",
              useVariables: true,
            },
          ],
          callback: async (action) => {
            if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
              self.log(
                "debug",
                "sending to " + self.config.host + ": " + self.REQUESTS[i].id
              );
              self.sendCommand(Buffer.from("*" + self.REQUESTS[i].id + "=?\r"));
            } else {
              self.log("debug", "tcpSocket not connected :(");
            }
          },
        };
      }
    }

    //Generic Command to send requests not listed in constants
    actions["send"] = {
      name: "Send Command",
      options: [
        {
          type: "textinput",
          id: "id_send",
          label: "Command:",
          tooltip: "Use %hh to insert Hex codes",
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
          //self.socket.write(buf);

          self.log(
            "debug",
            "sending to " + self.config.host + ": " + sendBuf.toString()
          );

          if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
            self.sendCommand(sendBuf);
          } else {
            self.log("debug", "tcpSocket not connected :(");
          }
        }
      },
    };

    //Lens Adjustments
    actions["lensAdjustments"] = {
      name: "Lens Adjustments",
      options: [
        {
          id: "adjustment",
          type: "dropdown",
          label: "Select name",
          choices: [
            { id: "zoom.in", label: "zoom in" },
            { id: "zoom.out", label: "zoom out" },
            { id: "focus.near", label: "focus near" },
            { id: "focus.far", label: "focus far" },
            { id: "lens.up", label: "lens up" },
            { id: "lens.down", label: "lens down" },
            { id: "lens.left", label: "lens left" },
            { id: "lens.right", label: "lens right" },
            { id: "lens.center", label: "lens center" },
          ],
          default: "zoom.in",
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const adjustment = await self.parseVariablesInString(
          action.options.adjustment
        );
        if (adjustment != "") {
          if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
            self.log(
              "debug",
              "sending to " + self.config.host + ":  *" + adjustment
            );
            self.sendCommand(Buffer.from("*" + adjustment));
          } else {
            self.log("debug", "tcpSocket not connected :(");
          }
        }
      },
    };

    self.setActionDefinitions(actions);
  },
};

//function (self) {
//  self.setActionDefinitions({
//   send: {
//     name: "Send Command",
//     options: [
//       {
//         type: "textinput",
//         id: "id_send",
//         label: "Command:",
//         tooltip: "Use %hh to insert Hex codes",
//         default: "",
//         useVariables: true,
//       },
//       //        {
//       //          type: "dropdown",
//       //          id: "id_end",
//       //          label: "Command End Character:",
//       //          default: "\n",
//       //          choices: CHOICES_END,
//       //        },
//     ],
//     callback: async (action) => {
//       const cmd = unescape(
//         await self.parseVariablesInString(action.options.id_send)
//       );
//
//       if (cmd != "") {
//         /*
//          * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
//          * sending a string assumes 'utf8' encoding
//          * which then escapes character values over 0x7F
//          * and destroys the 'binary' content
//          */
//         //			const sendBuf = Buffer.from(cmd + action.options.id_end, "latin1");
//         const sendBuf = Buffer.from(cmd );
//
//         self.log(
//           "debug",
//           "sending to " + self.config.host + ": " + sendBuf.toString()
//         );
//
//         if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
//           self.sendCommand(sendBuf);
//         } else {
//           self.log("debug", "tcpSocket not connected :(");
//         }
//       }
//     },
//   },
//   testPatterns: {
//     name: "TestPatterns",
//     options: [
//       {
//         id: "val",
//         type: "dropdown",
//         label: "Select name",
//         choices: [
//           { id: 0, label: "Off" },
//           { id: 1, label: "White" },
//           { id: 2, label: "Black" },
//           { id: 3, label: "Red" },
//           { id: 4, label: "Green" },
//           { id: 5, label: "Blue" },
//           { id: 6, label: "Checkboard" },
//           { id: 7, label: "CrossHatch" },
//           { id: 8, label: "V Burst" },
//           { id: 9, label: "H Burst" },
//           { id: 10, label: "ColorBar" },
//           { id: 11, label: "Plunge" },
//         ],
//         default: 0,
//         useVariables: true,
//       },
//     ],
//     callback: async (action) => {
//       const pattern = await self.parseVariablesInString(action.options.val);
//       self.log("debug", "pattern = " + pattern);
//       if (pattern != "") {
//         if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
//           self.log(
//             "debug",
//             "sending to " + self.config.host + ":  *test.pattern = " + pattern
//           );
//           self.sendCommand(
//             Buffer.from("*test.pattern = " + pattern )
//           );
//         } else {
//           self.log("debug", "tcpSocket not connected :(");
//         }
//       }
//     },
//   },
//   lensAdjustments: {
//     name: "lensAdjustments",
//     options: [
//       {
//         id: "adjustment",
//         type: "dropdown",
//         label: "Select name",
//         choices: [
//           { id: "zoom.in", label: "zoom in" },
//           { id: "zoom.out", label: "zoom out" },
//           { id: "focus.near", label: "focus near" },
//           { id: "focus.far", label: "focus far" },
//           { id: "lens.up", label: "lens up" },
//           { id: "lens.down", label: "lens down" },
//           { id: "lens.left", label: "lens left" },
//           { id: "lens.right", label: "lens right" },
//           { id: "lens.center", label: "lens center" },
//         ],
//         default: 0,
//         useVariables: true,
//       },
//     ],
//     callback: async (action) => {
//       const adjustment = await self.parseVariablesInString(
//         action.options.adjustment
//       );
//       if (adjustment != "") {
//         if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
//           self.log(
//             "debug",
//             "sending to " + self.config.host + ":  *" + adjustment
//           );
//           self.sendCommand(Buffer.from("*" + adjustment ));
//         } else {
//           self.log("debug", "tcpSocket not connected :(");
//         }
//       }
//     },
//   },
//   configUpdated: {
//     name: "Config Updated",
//     options: [],
//     callback: async () => {
//       await self.configUpdated();
//     },
//   },
//  });
//};
//
