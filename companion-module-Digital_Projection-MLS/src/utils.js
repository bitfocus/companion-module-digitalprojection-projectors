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
      self.tcpSocket.destroy();
      delete self.tcpSocket;
    }

    self.updateStatus(InstanceStatus.Connecting);

    if (self.config.host && self.config.tcpPort) {
      self.tcpSocket = new TCPHelper(self.config.host, self.config.tcpPort);

      self.tcpSocket.on("connect", () => {
        self.updateStatus(InstanceStatus.Ok);
        self.REQUESTS.forEach((request, index) => {
          if (request.type !== "function") {
            setTimeout(() => {
              self.tcpSocket.send("*" + request.id + "=?\r");
              self.log(
                "debug",
                "initial Request sending: *" + request.id + "=?\r"
              );
            }, 1100 * (index + 1));
          }
        });
        //  cmd = "*status=?\r";
        //  self.tcpSocket.send(cmd);
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

  //  initUdpConnection: function () {
  //    let self = this;
  //    let cmd;
  //
  //    if (self.udpSocket !== undefined) {
  //      self.udpSocket.destroy();
  //      delete self.udpSocket;
  //    }
  //
  //    self.updateStatus(InstanceStatus.Connecting);
  //
  //    if (self.config.host && self.config.udpPort) {
  //      self.udpSocket = new UDPHelper(self.config.host, self.config.udpPort);
  //
  //      self.udpSocket.on("connect", () => {
  //        self.updateStatus(InstanceStatus.Ok);
  //        cmd = "%0xF6%0x00%0x00%0xF6";
  //        self.udpSocket.send(cmd);
  //      });
  //      self.udpSocket.on("listening", () => {
  //        self.log("debug", "udp listening");
  //      });
  //
  //      self.udpSocket.on("error", (err) => {
  //        self.updateStatus(InstanceStatus.ConnectionFailure, err.message);
  //        self.log("error", "Network error: " + err.message);
  //      });
  //      self.udpSocket.on("status_change", (status, message) => {
  //        self.updateStatus(status, message);
  //        self.log("debug", "udp status_change: " + message);
  //      });
  //      self.udpSocket.on("data", (data) => {
  //        let indata = data.toString("utf8");
  //        //self.processFeedback(indata);
  //        self.log("debug", "udp received data: " + indata);
  //      });
  //    }
  //  },

  sendCommand: function (cmd) {
    let self = this;

    if (self.tcpSocket !== undefined && self.tcpSocket.isConnected) {
      self.tcpSocket.send(cmd + "\r", "latin1");
    } else {
      self.log("error", "tcpSocket not connected :(");
    }
  },

  //    let self = this;
  //
  //    let newLevel = self.FADER_LEVEL;
  //
  //    if (direction === "increase") {
  //      newLevel++;
  //    } else {
  //      newLevel--;
  //    }
  //
  //    if (newLevel > 100 || newLevel < 0) {
  //      self.Fader_Timer(direction, "stop", null);
  //    } else {
  //      let cmd;
  //
  //      if (self.config.model === "cp650") {
  //        cmd = "fader_level=" + newLevel;
  //      } else {
  //        let prefix = "";
  //        if (self.config.model === "cp750") {
  //          prefix = "cp750.";
  //        }
  //        cmd = prefix + "sys.fader " + newLevel;
  //      }
  //
  //      if (cmd) {
  //        self.sendCommand(cmd);
  //      }
  //    }
  //  },

  //  Fader_Timer: function (direction, mode, rate) {
  //    let self = this;
  //
  //    if (self.TIMER_FADER !== null) {
  //      clearInterval(self.TIMER_FADER);
  //      self.TIMER_FADER = null;
  //    }
  //
  //    if (mode === "start") {
  //      self.TIMER_FADER = setInterval(
  //        self.Fader_Change.bind(self),
  //        parseInt(rate),
  //        direction
  //      );
  //    }
  //  },

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

    inConstants = incDataArg.toUpperCase().replace(/\s/g, "").toString();

    if (self[inConstants]) {
      self.log(
        "debug",
        "received arg:" + cmdArray_value + " in Constants: " + inConstants
      );
      //self.log("debug", "Constant data: " + self[inConstants][0]);
      if (parseInt(cmdArray_value)) {
        value = self[inConstants].find(
          ({ id }) => id === parseInt(cmdArray_value)
        ).label;
        variableObj[incDataArg] = value;
      } else {
        self.log(
          "debug",
          "received arg:" + cmdArray_value + " not in Constants: " + inConstants
        );
      }
    } else {
      self.log("debug", "received arg not in Constants: " + inConstants);
    }

    self.setVariableValues(variableObj);
  },
};
