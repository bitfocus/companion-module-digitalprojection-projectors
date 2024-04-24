const { combineRgb } = require("@companion-module/base");

module.exports = {
  initFeedbacks: function () {
    let self = this;
    let feedbacks = {};

    const foregroundColor = combineRgb(255, 255, 255); // White
    const backgroundColorRed = combineRgb(255, 0, 0); // Red

    feedbacks["status"] = {
      type: "boolean",
      name: "Change Button Color If status is true",
      description: "If status is true, set the button to this color.",
      defaultStyle: {
        color: foregroundColor,
        bgcolor: backgroundColorRed,
      },
      callback: function () {
        self.log(
          "debug",
          "status variable value: " + self.getVariableValue("status")
        );
        if (self.getVariableValue("status") === "Imaging") {
          return true;
        }

        return false;
      },
    };

    self.setFeedbackDefinitions(feedbacks);
  },
};
