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

        let id = self[modelChoice].length - 1;

        while (id >= 0) {
          if (self[modelChoice][id].Name.includes("xxx")) {
            self[modelChoice].splice(id, 1);
          }
          id--;
        }
        let index = 0;
        self[modelChoice].forEach((command) => {
          if (command.Settings.includes("?")) {
            setTimeout(() => {
              self.tcpSocket.send("*" + command.CmdStr + " ?\r");
              self.log(
                "debug",
                "initial Request sending for command Name: *" +
                  command.CmdStr +
                  " ?\r"
              );
            }, parseInt(self.config.timeout) * index);
            index++;
          } else {
            return;
          }
        });
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
        let incomingData = data.toString("utf8");
        self.processFeedback(incomingData);
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

  processFeedback: function (incomingData) {
    let self = this;
    let variableObj = {};
    let argument;
    let dataArray = incomingData.trim().split("="); //split the data into an array
    let rawArgument = dataArray[0].split(" ")[1].replace(/[\s*]/g, "");
    let value = dataArray[1]; //get the cmdArray[1] as the value

    if (rawArgument.includes(".")) {
      let argumentParts = rawArgument.split(".");
      if (argumentParts.length === 2) {
        argument = argumentParts[0] + "_" + argumentParts[1];
      } else if (argumentParts.length === 3) {
        argument =
          argumentParts[0] + "_" + argumentParts[1] + "_" + argumentParts[2];
      }
    } else {
      argument = rawArgument;
    }

    let model = self.config.model.toUpperCase();
    if (self[model] !== undefined) {
      self[model].forEach((command) => {
        if (rawArgument === command.CmdStr) {
          {
            // Iterate thru keys of command object to list keys starting with "data"
            let list = this.createList(command);
            //Search for "dropdownList" commands
            if (list.length > 0) {
              if (list[parseInt(value)]) {
                if (list.length === 2 && list[0].label === "Off") {
                  variableObj[argument] = list[parseInt(value)].label;
                  self.setVariableValues(variableObj);
                  self.checkFeedbacks(argument);
                  self.checkFeedbacks("On");
                  self.checkFeedbacks("Off");
                } else {
                  variableObj[argument] = list[parseInt(value)].label;
                  self.setVariableValues(variableObj);
                  self.checkFeedbacks(argument);
                }
              } else {
                variableObj[argument] = value;
                self.setVariableValues(variableObj);
                self.checkFeedbacks(argument);
              }
            } else {
              variableObj[argument] = value;
              self.setVariableValues(variableObj);
              self.checkFeedbacks(argument);
            }
          }
        }
      });
    }
    //Update last TCP response variable
    variableObj["tcp_response"] = incomingData;
  },

  reduceModel: function (model, self) {
    let reducedModel = [];
    if (self[model] !== undefined) {
      reducedModel = self[model].filter((command) => {
        if (
          (!command.Name.includes("xxx") && command.Name !== "") ||
          (command.CmdStr === "" && command.Value !== "")
        ) {
          return true; // Keep this object
        } else {
          return false; // Don't keep this object
        }
      });
      return reducedModel;
    }
    self.log("debug", "model not found: " + model);
  },

  createList: function (command) {
    // Iterate thru keys of command object to list keys starting with "data"
    let dataKeys = [];
    let previousDataValueWasEmpty = true;
    let list = [];
    dataKeys = Object.keys(command).filter((key) => key.startsWith("data"));
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
    return list;
  },
};
