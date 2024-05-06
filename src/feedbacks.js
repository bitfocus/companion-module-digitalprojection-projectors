const { combineRgb } = require("@companion-module/base");

module.exports = {
  initFeedbacks: function () {
    let self = this;
    let feedbacks = {};
    //let feedbackName = "";

    const foregroundColorWhite = combineRgb(255, 255, 255); // White
    const foregroundColorBlack = combineRgb(0, 0, 0);
    const backgroundColorRed = combineRgb(255, 0, 0); // Red
    const backgroundColorGreen = combineRgb(0, 255, 0); // Green
    const backgroundColorBlue = combineRgb(0, 0, 255); // Blue
    const backgroundColorCyan = combineRgb(0, 255, 255); // Cyan
    const backgroundColorMagenta = combineRgb(255, 0, 255); // Magenta
    const backgroundColorYellow = combineRgb(255, 255, 0); // Yellow
    const backgroundColorOrange = combineRgb(255, 165, 0); // Orange
    const PolarNight0 = combineRgb(38, 40, 46);
    const PolarNight1 = combineRgb(48, 50, 56);
    const PolarNight2 = combineRgb(58, 60, 66);
    const snow1 = combineRgb(216, 222, 233);
    const snow2 = combineRgb(229, 233, 240);
    const snow3 = combineRgb(236, 239, 244);
    const auroraRed = combineRgb(210, 82, 82);
    const auroraOrange = combineRgb(217, 154, 102);
    const auroraYellow = combineRgb(223, 194, 101);
    const auroraGreen = combineRgb(142, 192, 124);
    const auroraBlue = combineRgb(97, 175, 239);
    const auroraPurple = combineRgb(175, 152, 219);

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

              feedbacks[feedbackName] = {
                type: "boolean",
                name: feedbackName,
                description: "If status is true, set the button to this color.",
                defaultStyle: {
                  color: PolarNight0,
                  bgcolor: auroraOrange,
                },
                callback: function () {
                  if (self.getVariableValue(feedbackName) === "") {
                    return true;
                  }

                  return false;
                },
              };
            } else if (command.length === 3) {
              let feedbackName =
                command[0] + "_" + command[1] + "_" + command[2];
              let varName = "$(" + self.label + ":" + feedbackName + ")";

              feedbacks[feedbackName] = {
                type: "boolean",
                name: feedbackName,
                description: "If status is true, set the button to this color.",
                defaultStyle: {
                  color: PolarNight0,
                  bgcolor: auroraOrange,
                },
                options: [{ value: self.getVariableValue(feedbackName) }],
                callback: ({ options }) => {
                  if (self.getVariableValue(feedbackName) === "") {
                    return true;
                  }

                  return false;
                },
              };
            }
          } else {
            let feedbackName = command.CmdStr;
            let varName = "$(" + self.label + ":" + feedbackName + ")";
            feedbacks[feedbackName] = {
              type: "boolean",
              name: feedbackName,
              description: "If status is true, set the button to this color.",
              defaultStyle: {
                color: PolarNight0,
                bgcolor: auroraOrange,
              },
              callback: function () {
                if (
                  self.getVariableValue(feedbackName) === "" ||
                  self.getVariableValue(feedbackName) === undefined
                ) {
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
        color: PolarNight0,
        bgcolor: auroraOrange,
      },
      callback: function () {
        if (self.getVariableValue("status") === "Imaging") {
          return true;
        }

        return false;
      },
    };

    feedbacks["On"] = {
      type: "boolean",
      name: "On",
      description:
        "For toggles including on/off choices, set the button to Green for on.",
      defaultStyle: {
        color: PolarNight0,
        bgcolor: auroraGreen,
      },
      options: [{ type: "static-text" }],

      callback: function (feedback) {
        let incValue = self.getVariableValue(feedback.options.value);

        if (incValue === "On") {
          return true;
        }
        return false;
      },
    };

    feedbacks["Off"] = {
      type: "boolean",
      name: "Off",
      description:
        "For toggles including on/off choices, set the button to Red for off.",
      defaultStyle: {
        color: snow1,
        bgcolor: auroraRed,
      },
      options: [{ type: "static-text" }],

      callback: function (feedback) {
        let incValue = self.getVariableValue(feedback.options.value);

        if (incValue === "Off") {
          return true;
        }
        return false;
      },
    };

    self.setFeedbackDefinitions(feedbacks);
  },
};
