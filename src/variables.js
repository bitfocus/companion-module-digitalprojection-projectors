const { forEach } = require("./upgrades");

module.exports = {
  initVariables: function () {
    let self = this;
    let variables = [];
    let variableObj = {};
    // Generic variable
    variables.push({ variableId: "tcp_response", name: "Last TCP Response" });
    // Model specific variables
    let model = self.config.model.toUpperCase();
    if (self[model]) {
      self[model].forEach((command) => {
        if (
          !command.Name.includes("xxx") &&
          command.Settings.toString().includes("?")
        ) {
          let initialValue = command.Value;
          if (command.CmdStr.includes(".")) {
            command = command.CmdStr.split(".");
            if (command.length === 2) {
              variables.push({
                variableId: command[0] + "_" + command[1],
                name:
                  command[0].charAt(0).toUpperCase() +
                  command[0].slice(1) +
                  " " +
                  command[1].charAt(0).toUpperCase() +
                  command[1].slice(1),
                description: command.Category,
              });
            } else if (command.length === 3) {
              variables.push({
                variableId: command[0] + "_" + command[1] + "_" + command[2],
                name:
                  command[0].charAt(0).toUpperCase() +
                  command[0].slice(1) +
                  " " +
                  command[1].charAt(0).toUpperCase() +
                  command[1].slice(1) +
                  " " +
                  command[2].charAt(0).toUpperCase() +
                  command[2].slice(1),
                description: command.Category,
              });
            }
          } else {
            variables.push({
              variableId: command.CmdStr,
              name:
                command.CmdStr.charAt(0).toUpperCase() +
                command.CmdStr.slice(1),
              description: command.Category,
            });
          }
        } else if (command.CmdStr === "" && command.Value !== "") {
          //Constants
          let constantId = command.Name.toLowerCase().replaceAll(" ", "_");
          variables.push({
            variableId: constantId,
            name: command.Name,
            description: command.Category,
          });
          variableObj[constantId] = command.Value;
          setTimeout(() => {
            self.setVariableValues(variableObj);
          }, 2000);
        }
      });
    }
    self.setVariableDefinitions(variables);
  },
};
