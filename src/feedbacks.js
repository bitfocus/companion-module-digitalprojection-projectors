const { combineRgb } = require("@companion-module/base");

module.exports = {
  initFeedbacks: function () {
    let self = this;
    let feedbacks = {};
    //let feedbackName = "";

    const foregroundColor = combineRgb(255, 255, 255); // White
    const backgroundColorRed = combineRgb(255, 0, 0); // Red

    let model = self.config.model.toUpperCase();
    if (self[model]) {
      self[model].forEach((command) => {
        if (
          !command.Name.includes("xxx") &&
          command.Settings.toString().includes("?")
        ) {
          //let initialValue = command.Value;
          if (command.CmdStr.includes(".")) {
            command = command.CmdStr.split(".");
            if (command.length === 2) {
              let feedbackName = command[0] + "_" + command[1];
              let varName = "$(" + self.label + ":" + feedbackName + ")";
              //self.log(
              //  "debug",
              //  "creating feedback: " +
              //    feedbackName +
              //    " based on variable " +
              //    varName
              //);
              feedbacks[feedbackName] = {
                type: "boolean",
                name: feedbackName,
                description: "If status is true, set the button to this color.",
                defaultStyle: {
                  color: foregroundColor,
                  bgcolor: backgroundColorRed,
                },
                callback: function () {
                  //self.log(
                  //  "debug",
                  //  "status variable value: " +
                  //    self.getVariableValue(feedbackName)
                  //);
                  if (self.getVariableValue(feedbackName) === "") {
                    //self.log("debug", "returning true");
                    return true;
                  }
                  //self.log("debug", "returning false");
                  return false;
                },
              };
            } else if (command.length === 3) {
              let feedbackName =
                command[0] + "_" + command[1] + "_" + command[2];
              let varName = "$(" + self.label + ":" + feedbackName + ")";
              //self.log(
              //  "debug",
              //  "creating feedback: " +
              //    feedbackName +
              //    " based on variable " +
              //    varName
              //);
              feedbacks[feedbackName] = {
                type: "boolean",
                name: feedbackName,
                description: "If status is true, set the button to this color.",
                defaultStyle: {
                  color: foregroundColor,
                  bgcolor: backgroundColorRed,
                },
                options: [{ value: self.getVariableValue(feedbackName) }],
                callback: ({ options }) => {
                  //self.log("debug", "status variable value: " + options);
                  if (options === "") {
                    return true;
                  }

                  return false;
                },
              };
            }
          } else {
            let feedbackName = command.CmdStr;
            let varName = "$(" + self.label + ":" + feedbackName + ")";
            //self.log(
            //  "debug",
            //  "creating feedback: " +
            //    feedbackName +
            //    " based on variable " +
            //    varName
            //);
            feedbacks[feedbackName] = {
              type: "boolean",
              name: feedbackName,
              description: "If status is true, set the button to this color.",
              defaultStyle: {
                color: foregroundColor,
                bgcolor: backgroundColorRed,
              },
              callback: function () {
                //self.log(
                //  "debug",
                //  "status variable value: " +
                //    self.getVariableValue(feedbackName)
                //);
                if (self.getVariableValue(feedbackName) === "") {
                  return true;
                }

                return false;
              },
            };
          }
        }
      });
    }

    feedbacks["status"] = {
      type: "boolean",
      name: "Change Button Color If status is true",
      description: "If status is true, set the button to this color.",
      defaultStyle: {
        color: foregroundColor,
        bgcolor: backgroundColorRed,
      },
      callback: function () {
        //self.log(
        //  "debug",
        //  "status variable value: " + self.getVariableValue("status")
        //);
        if (self.getVariableValue("status") === "Imaging") {
          return true;
        }

        return false;
      },
    };

    self.setFeedbackDefinitions(feedbacks);
  },
};
