const { forEach } = require("./upgrades");

module.exports = {
  initVariables: function () {
    let self = this;
    let variables = [];

    variables.push({ variableId: "tcp_response", name: "Last TCP Response" });
    let model = self.config.model.toUpperCase();
    if (self[model]) {
      self[model].forEach((command) => {
        if (!command.Name.includes("xxx") && command.Settings.includes("?")) {
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
            //  self.log(
            //    "debug",
            //    "une variable d'un mot: " +
            //      command.CmdStr.charAt(0).toUpperCase() +
            //      command.CmdStr.slice(1)
            //  );
            variables.push({
              variableId: command.CmdStr,
              name:
                command.CmdStr.charAt(0).toUpperCase() +
                command.CmdStr.slice(1),
              description: command.Category,
            });
          }
        }
      });
    }
    //    self.REQUESTS.forEach((request) => {
    //      if (request.type !== "function") {
    //        if (request.id.includes(".")) {
    //          request = request.id.split(".");
    //          if (request.length === 2) {
    //            variables.push({
    //              variableId: request[0] + "_" + request[1],
    //              name:
    //                request[0].charAt(0).toUpperCase() +
    //                request[0].slice(1) +
    //                " " +
    //                request[1].charAt(0).toUpperCase() +
    //                request[1].slice(1),
    //            });
    //          } else if (request.length === 3) {
    //            variables.push({
    //              variableId: request[0] + "_" + request[1] + "_" + request[2],
    //              name:
    //                request[0].charAt(0).toUpperCase() +
    //                request[0].slice(1) +
    //                " " +
    //                request[1].charAt(0).toUpperCase() +
    //                request[1].slice(1) +
    //                " " +
    //                request[2].charAt(0).toUpperCase() +
    //                request[2].slice(1),
    //            });
    //          }
    //        } else {
    //          variables.push({
    //            variableId: request.id,
    //            name: request.id.charAt(0).toUpperCase() + request.id.slice(1),
    //          });
    //        }
    //      }
    //    });

    self.setVariableDefinitions(variables);
  },
};
