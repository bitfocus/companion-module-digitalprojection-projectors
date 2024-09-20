const { forEach } = require("./upgrades");
const { reduceModel } = require("./utils");

module.exports = {
  initVariables: function (mls, element_name) {
    let self = this;
    let variables;
    let model;
    switch (mls) {
      case "MLS":
        variables = self.variables;
        model = "MLS10000";
        element_name = element_name.trim() + "_";
        break;
      case "Satellite":
        variables = self.variables;
        model = "SATELLITEHIGHLITE4K";
        element_name = element_name.trim() + "_";
        break;
      default:
        variables = [];
        model = self.config.model.toUpperCase();
        element_name = "";
        variables.push({
          variableId: "tcp_response",
          name: "Last TCP Response",
        });
        break;
    }

    //let variables = [];
    let variableObj = {};

    //Set Generic Variable
    //variables.push({ variableId: "tcp_response", name: "Last TCP Response" });

    //Set Model specific variables
    //let model = self.config.model.toUpperCase();
    let reducedModel = reduceModel(model, self);
    if (reducedModel) {
      self.log(
        "debug",
        "MLS element with name:" + element_name + " received in variables.js"
      );

      reducedModel.forEach((command) => {
        //Search for available variables
        if (command.Settings.toString().includes("?")) {
          if (command.CmdStr.includes(".")) {
            command = command.CmdStr.split(".");
            if (command.length === 2) {
              variableObj = {
                variableId: element_name + command[0] + "_" + command[1],
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
                variableId:
                  element_name +
                  command[0] +
                  "_" +
                  command[1] +
                  "_" +
                  command[2],
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
              variableId: element_name + command.CmdStr,
              name:
                command.CmdStr.charAt(0).toUpperCase() +
                command.CmdStr.slice(1),
              description: command.Category,
            };
          }
          variables.push(variableObj);
        }
        // Set Constants
        else if (command.CmdStr === "" && command.Value !== "") {
          let constantId =
            element_name + command.Name.toLowerCase().replaceAll(" ", "_");
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
    self.variables = variables;
    //self.log("debug", "variables:" + JSON.stringify(variables));
    self.setVariableDefinitions(variables);
  },
};
