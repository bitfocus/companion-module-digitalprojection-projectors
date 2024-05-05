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
    //self.log("debug", "instance is named: " + self.label);

    if (self.config.host && self.config.tcpPort) {
      self.tcpSocket = new TCPHelper(self.config.host, self.config.tcpPort);

      self.tcpSocket.on("connect", () => {
        self.updateStatus(InstanceStatus.Ok);

        let modelChoice = self.config.model.toUpperCase();

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
                  //self.log(
                  //  "debug",
                  //  "initial Request sending: *" + command.CmdStr + " ?\r"
                  //);
                }, parseInt(self.config.timeout) * (index + 1));
              }
            });
          } catch (error) {
            self.log("error", error);
          }
        }
        init();
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
    let incDataArg;

    let value;
    variableObj["tcp_response"] = data;
    cmdArray = data.trim().split("="); //split the data into an array
    let cmdArrayArgument = cmdArray[0].split(" ")[1].replace(/[\s*]/g, "");
    //cmdArray_argument = cmdArray[0].split(" ")[1].replace(/[\s*]/g, ""); //get the cmdArray[0] as the argument
    cmdArray_value = cmdArray[1]; //get the cmdArray[1] as the value

    //self.log("debug", "cmdArray_argument = " + cmdArrayArgument);
    //self.log("debug", "cmdArray_value = " + cmdArray_value);
    //self.log("debug", "cmdArray_typeof_value = " + typeof cmdArray_value);

    if (cmdArrayArgument.includes(".")) {
      cmdArray_argument = cmdArrayArgument.split(".");
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
      incDataArg = cmdArrayArgument;
    }

    let model = self.config.model.toUpperCase();
    if (self[model] !== undefined) {
      self[model].forEach((command) => {
        if (cmdArrayArgument === command.CmdStr) {
          {
            // Iterate thru keys of command object to list keys starting with "data"
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
            //Search for "dropdownList" commands
            if (list.length > 0) {
              //self.log(
              //  "debug",
              //  "cmdArrayArgument = " +
              //    cmdArrayArgument +
              //    ", command.CmdStr = " +
              //    command.CmdStr
              //);

              if (list[parseInt(cmdArray_value)]) {
                //self.log(
                //  "debug",
                //  "name of returned option is: " +
                //    list[parseInt(cmdArray_value)].label
                //);
                variableObj[incDataArg] = list[parseInt(cmdArray_value)].label;
                self.setVariableValues(variableObj);
                self.checkFeedbacks(incDataArg);
              } else {
                //self.log(
                //  "debug",
                //  "name of returned option is: " + cmdArray_value
                //);
                variableObj[incDataArg] = cmdArray_value;
                self.setVariableValues(variableObj);
                self.checkFeedbacks(incDataArg);
              }
            } else {
              //self.log(
              //  "debug",
              //  "2. set variable value as this= " + cmdArray_value
              //);
              variableObj[incDataArg] = cmdArray_value;
              self.setVariableValues(variableObj);
              self.checkFeedbacks(incDataArg);
            }
          }
        }
      });
    }

    //variableObj[incDataArg] = cmdArray_value;
    //self.setVariableValues(variableObj);
    //self.checkFeedbacks(incDataArg);
  },
};
