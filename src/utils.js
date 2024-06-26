const {
  InstanceStatus,
  TCPHelper,
  // UDPHelper,
} = require("@companion-module/base");

module.exports = {
  initTcpConnection: function () {
    let self = this;
    if (self.tcpSocket !== undefined) {
      self.tcpSocket.destroy(self);
      delete self.tcpSocket;
    }

    self.updateStatus(InstanceStatus.Connecting);
    if (self.config.host && self.config.tcpPort && self.config.model !== "0") {
      self.log(
        "info",
        `Opening connection to ${self.config.host}:${self.config.tcpPort}...`
      );
      self.tcpSocket = new TCPHelper(self.config.host, self.config.tcpPort);

      self.tcpSocket.on("connect", () => {
        self.updateStatus(InstanceStatus.Ok);
        self.startInitialRequests();
      });
      self.tcpSocket.on("error", (err) => {
        self.TIMEOUTS.forEach((timeout) => {
          clearTimeout(timeout);
        });
        self.handleError(err);
      });

      self.tcpSocket.on("status_change", (status, message) => {
        self.updateStatus(status, message);
        self.log("debug", "status_change: " + status);
      });

      self.tcpSocket.on("data", (data) => {
        let incomingData = data.toString("utf8");
        self.processFeedback(incomingData);
      });
    } else if (self.config.model === "0") {
      self.updateStatus(InstanceStatus.BadConfig);
      self.log("error", "No model defined");
    } else if (!self.config.host) {
      self.updateStatus(InstanceStatus.BadConfig);
      self.log("error", "No host defined");
    } else {
      self.updateStatus(InstanceStatus.BadConfig);
      self.log("error", "No tcpPort defined");
    }
  },

  handleError: function (err) {
    let self = this;

    try {
      let error = err.toString();
      let printedError = false;

      Object.keys(err).forEach(function (key) {
        if (key === "code") {
          if (err[key] === "ECONNREFUSED") {
            error =
              "Unable to communicate with Device. Connection refused. Is this the right IP address? Is it still online?";
            self.log("error", error);
            self.updateStatus(
              InstanceStatus.ConnectionFailure,
              "Connection Refused"
            );
            printedError = true;
            if (self.socket !== undefined) {
              self.socket.destroy();
            }
            self.startReconnectInterval();
          } else if (err[key] === "ETIMEDOUT") {
            error =
              "Unable to communicate with Device. Connection timed out. Is this the right IP address? Is it still online?";
            self.log("error", error);
            self.updateStatus(
              InstanceStatus.ConnectionFailure,
              "Connection Timed Out"
            );
            printedError = true;
            if (self.tcpSocket !== undefined) {
              self.tcpSocket.destroy();
            }
            self.startReconnectInterval();
          } else if (err[key] === "ECONNRESET") {
            error =
              "The connection was reset. Check the log for more error information.";
            self.log("error", error);
            self.updateStatus(
              InstanceStatus.ConnectionFailure,
              "Connection Reset"
            );
            printedError = true;
            if (self.tcpSocket !== undefined) {
              self.tcpSocket.destroy();
            }
            self.startReconnectInterval();
          }
        }
      });

      if (!printedError) {
        self.log("error", `Error: ${error}`);
      }
    } catch (error) {
      self.log("error", "Error handling error: " + error);
      self.log("error", "Error: " + String(err));
    }
  },

  startReconnectInterval: function () {
    let self = this;

    self.updateStatus(InstanceStatus.ConnectionFailure, "Reconnecting");

    if (self.RECONNECT_INTERVAL !== undefined) {
      clearInterval(self.RECONNECT_INTERVAL);
      self.RECONNECT_INTERVAL = undefined;
    }

    self.log("info", "Attempting to reconnect in 30 seconds...");

    self.RECONNECT_INTERVAL = setTimeout(
      self.initTcpConnection.bind(this),
      30000
    );
  },

  sendCommand: function (cmd) {
    let self = this;

    if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
      self.tcpSocket.send("*" + cmd + "\r", "latin1");
    } else {
      self.log("error", "tcpSocket not connected :(");
    }
  },

  startInitialRequests: function () {
    let self = this;
    //self.TIMEOUT = self.config.timeout;

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
        if (self.tcpSocket.isConnected) {
          let timeout = setTimeout(() => {
            if (self.tcpSocket.isConnected) {
              self.tcpSocket.send("*" + command.CmdStr + " ?\r");
              self.log(
                "debug",
                "initial Request sending: *" + command.CmdStr + " ?\r"
              );
            } else {
              self.log("error", "tcpSocket not connected :(");
            }
          }, parseInt(self.config.timeout) * index);
          index++;
          self.TIMEOUTS.push(timeout);
        } else {
          self.log("error", "tcpSocket not connected :(");
        }
      } else {
        return;
      }
    });
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
