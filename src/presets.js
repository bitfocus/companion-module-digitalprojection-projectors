const { combineRgb } = require("@companion-module/base");

module.exports = {
  initPresets: function () {
    let self = this;
    let presets = [];

    //    for (let i in self.REQUESTS) {
    //      //Range presets
    //      if (self.REQUESTS[i].type === "range") {
    //        let basename = self.REQUESTS[i].id.replace(/\./g, "_");
    //        let presetAction = self.REQUESTS[i].id.replace(/\./g, " ");
    //        let presetName = "Status of " + basename;
    //        let presetText =
    //          "concat('" +
    //          basename +
    //          ": ',$(Digital_Projection-MLS:" +
    //          basename +
    //          "))";
    //        presets.push({
    //          type: "button",
    //          category: "Info",
    //          name: presetName,
    //          style: {
    //            text: presetText,
    //            textExpression: true,
    //            size: "14",
    //            color: "16777215",
    //            bgcolor: combineRgb(0, 0, 0),
    //          },
    //          steps: [
    //            {
    //              down: [
    //                {
    //                  actionId: presetAction,
    //                },
    //              ],
    //              up: [],
    //            },
    //          ],
    //        });
    //      }
    //    }

    self.setPresetDefinitions(presets);
  },
};
