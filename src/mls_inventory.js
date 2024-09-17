const {
  InstanceStatus,
  TCPHelper,
  // UDPHelper,
} = require("@companion-module/base");

const { sendCommand, initTcpConnection, handleError } = require("./utils");
module.exports = {
  requestName: function (count) {
    let self = this;
    let inventory_count_value = self.getVariableValue("inventory_count");
    self.log(
      "debug",
      "number of element in the system: " + inventory_count_value
    );
    //self.log(
    //  "debug",
    //  "existing variables object: " + JSON.stringify(self.variables)
    //);
    if (inventory_count_value && inventory_count_value !== 0) {
      for (i = 1; i - 1 < inventory_count_value; i++) {
        //        let command = "inventory.name." + i.toString();
        sendCommand("inventory.name." + i + " = ?", 0, self);
      }
    }
  },
};
