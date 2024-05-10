const { forEach } = require("./upgrades");
const { reduceModel } = require("./utils");

module.exports = {
  initVariables: function () {
    let self = this;
    let variables = [];
    let variableObj = {};

    // Generic variable
    variables.push({ variableId: "tcp_response", name: "Last TCP Response" });

    // Model specific variables
    let model = self.config.model.toUpperCase();
    let reducedModel = reduceModel(model, self);
    reducedModel.forEach((command) => {
      if (command.Settings.toString().includes("?")) {
        //Set Variable Name
        if (command.CmdStr.includes(".")) {
          command = command.CmdStr.split(".");
          if (command.length === 2) {
            variableObj = {
              variableId: command[0] + "_" + command[1],
              name:
                command[0].charAt(0).toUpperCase() +
                command[0].slice(1) +
                " " +
                command[1].charAt(0).toUpperCase() +
                command[1].slice(1),
              description: command.Category,
            };
          } else if (command.length === 3) {
            variableObj = {
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
            };
          }
        } else {
          variableObj = {
            variableId: command.CmdStr,
            name:
              command.CmdStr.charAt(0).toUpperCase() + command.CmdStr.slice(1),
            description: command.Category,
          };
        }
        variables.push(variableObj);
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

    self.setVariableDefinitions(variables);
  },
};
