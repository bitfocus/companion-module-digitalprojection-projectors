const {
  InstanceStatus,
  TCPHelper,
  // UDPHelper,
} = require("@companion-module/base");

module.exports = {
  initTcpConnection: function () {
    let self = this;
    let cmd;

    if (self.tcpSocket !== undefined) {
      self.tcpSocket.destroy(self);
      delete self.tcpSocket;
    }

    self.updateStatus(InstanceStatus.Connecting);
    self.log("debug", "instance is named: " + self.label);

    if (self.config.host && self.config.tcpPort) {
      self.tcpSocket = new TCPHelper(self.config.host, self.config.tcpPort);

      self.tcpSocket.on("connect", () => {
        self.updateStatus(InstanceStatus.Ok);
        //        self.REQUESTS.forEach((request, index) => {
        //          if (request.type !== "function") {
        //            setTimeout(() => {
        //              self.tcpSocket.send("*" + request.id + " ?\r");
        //              self.log(
        //                "debug",
        //                "initial Request sending: *" + request.id + " ?\r"
        //              );
        //            }, 1100 * (index + 1));
        //          }
        //        });
        let modelChoice = self.config.model.toUpperCase();
        //        if (self.config.model === "scm") {
        //self.log("debug", "self.SCM: " + self.SCM);
        async function init() {
          try {
            let filteredArray = await new Promise((resolve, reject) => {
              let filteredArray = self[modelChoice].filter((obj) => {
                if (obj.Name.includes("xxx")) {
                  return false;
                }
                return true; // Keep this object
              });
              resolve(filteredArray);
            });
            self[modelChoice] = filteredArray;
            filteredArray.forEach((command, index) => {
              if (command.Settings.includes("?")) {
                setTimeout(() => {
                  self.tcpSocket.send("*" + command.CmdStr + " ?\r");
                  //                  self.log(
                  //                    "debug",
                  //                    "initial Request sending: *" + command.CmdStr + " ?\r"
                  //                  );
                }, 1100 * (index + 1));
              }
            });
          } catch (error) {
            self.log("error", error);
          }
        }
        init();
        //        } else if (self.config.model === "highlite") {
        //          self.HIGHLITE.forEach((command, index) => {
        //            if (!command.Name.includes("xxx")) {
        //              self.HIGHLITE.splice(index, 1);
        //            }
        //          });
        //          self.HIGHLITE.forEach((command, index) => {
        //            if (command.Settings.includes("?")) {
        //              setTimeout(() => {
        //                self.tcpSocket.send("*" + command.CmdStr + "\r");
        //                self.log(
        //                  "debug",
        //                  "initial Request sending: *" + command.CmdStr + "\r"
        //                );
        //              }, 1100 * (index + 1));
        //            }
        //          });
        //        } else if (self.config.model === "mls") {
        //          self.MLS.forEach((command, index) => {
        //            if (!command.Name.includes("xxx")) {
        //              self.MLS.splice(index, 1);
        //            }
        //          });
        //          self.MLS.forEach((command, index) => {
        //            if (command.Settings.includes("?")) {
        //              setTimeout(() => {
        //                self.tcpSocket.send("*" + command.CmdStr + "\r");
        //                self.log(
        //                  "debug",
        //                  "initial Request sending: *" + command.CmdStr + "\r"
        //                );
        //              }, 1100 * (index + 1));
        //            }
        //          });
        //        }
      });
      self.tcpSocket.on("error", (err) => {
        self.updateStatus(InstanceStatus.ConnectionFailure, err.message);
        self.log("error", "Network error: " + err.message);
      });

      self.tcpSocket.on("status_change", (status, message) => {
        self.updateStatus(status, message);
        self.log("debug", message);
      });

      self.tcpSocket.on("data", (data) => {
        let indata = data.toString("utf8");
        self.processFeedback(indata);
      });
    } else {
      self.updateStatus(InstanceStatus.BadConfig);
    }
  },

  sendCommand: function (cmd) {
    let self = this;

    if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
      self.tcpSocket.send("*" + cmd + "\r", "latin1");
    } else {
      self.log("error", "tcpSocket not connected :(");
    }
  },

  processFeedback: function (data) {
    let self = this;
    let cmdArray;

    let variableObj = {};

    let value;
    variableObj["tcp_response"] = data;
    cmdArray = data.trim().split("="); //split the data into an array
    cmdArray_argument = cmdArray[0].split(" ")[1].replace(/[\s*]/g, ""); //get the cmdArray[0] as the argument
    cmdArray_value = cmdArray[1]; //get the cmdArray[1] as the value

    self.log("debug", "cmdArray_argument = " + cmdArray_argument);
    self.log("debug", "cmdArray_value = " + cmdArray_value);
    self.log("debug", "cmdArray_typeof_value = " + typeof cmdArray_value);

    if (cmdArray_argument.includes(".")) {
      cmdArray_argument = cmdArray_argument.split(".");
      if (cmdArray_argument.length === 2) {
        incDataArg = cmdArray_argument[0] + "_" + cmdArray_argument[1];
      } else if (cmdArray_argument.length === 3) {
        incDataArg =
          cmdArray_argument[0] +
          "_" +
          cmdArray_argument[1] +
          "_" +
          cmdArray_argument[2];
      }
    } else {
      incDataArg = cmdArray_argument;
    }
    variableObj[incDataArg] = cmdArray_value;
    self.setVariableValues(variableObj);
  },
};
