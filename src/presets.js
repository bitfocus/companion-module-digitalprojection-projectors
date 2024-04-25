const { combineRgb } = require("@companion-module/base");

module.exports = {
  initPresets: function () {
    let self = this;
    let presets = [];

    for (let i in self.REQUESTS) {
      //Range presets
      if (self.REQUESTS[i].type === "range") {
        let basename = self.REQUESTS[i].id.replace(/\./g, "_");
        let presetAction = self.REQUESTS[i].id.replace(/\./g, " ");
        let presetName = "Status of " + basename;
        let presetText =
          "concat('" +
          basename +
          ": ',$(Digital_Projection-MLS:" +
          basename +
          "))";
        presets.push({
          type: "button",
          category: "Info",
          name: presetName,
          style: {
            text: presetText,
            size: "14",
            color: "16777215",
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: presetAction,
                },
              ],
              up: [],
            },
          ],
        });
      }
    }
    //		const foregroundColor = combineRgb(255, 255, 255) // White
    //		const foregroundColorBlack = combineRgb(0, 0, 0) // Black
    //		const backgroundColorRed = combineRgb(255, 0, 0) // Red
    //		const backgroundColorGreen = combineRgb(0, 255, 0) // Green
    //		const backgroundColorOrange = combineRgb(255, 102, 0) // Orange
    //
    //    presets.push({
    //      type: "button",
    //      category: "Info",
    //      name: "Status",
    //      style: {
    //        text: "$(Digital_Projection-MLS:status)",
    //        size: "14",
    //        color: "16777215",
    //        bgcolor: combineRgb(0, 0, 0),
    //      },
    //      steps: [
    //        {
    //          down: [
    //            {
    //              actionId: "fader_increase_timer",
    //              options: {
    //                rate: "500",
    //              },
    //            },
    //          ],
    //          up: [
    //            {
    //              actionId: "fader_increase_stop",
    //            },
    //          ],
    //        },
    //      ],
    //      feedbacks: ["status"],
    //    });
    //
    //    presets.push({
    //      type: "button",
    //      category: "Info",
    //      name: "Switch test pattern",
    //      style: {
    //        text: "$(Digital_Projection-MLS:test_pattern)",
    //        size: "auto",
    //        color: "16777215",
    //        bgcolor: combineRgb(0, 0, 0),
    //      },
    //      steps: [
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 0,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 1,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 2,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 3,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 4,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 5,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 6,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 7,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 8,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 9,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 10,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //        {
    //          down: [
    //            {
    //              actionId: "testPatterns",
    //              options: {
    //                patterns: 11,
    //              },
    //            },
    //          ],
    //          up: [],
    //        },
    //      ],
    //      feedbacks: ["status"],
    //    });
    //
    //		presets.push({
    //			type: 'button',
    //			category: 'Fader Level',
    //			name: 'Fader -',
    //			style: {
    //				text: 'Fader -',
    //				size: '14',
    //				color: '16777215',
    //				bgcolor: combineRgb(0, 0, 0),
    //			},
    //			steps: [
    //				{
    //					down: [
    //						{
    //							actionId: 'fader_decrease_timer',
    //							options: {
    //								rate: '500',
    //							},
    //						},
    //					],
    //					up: [
    //						{
    //							actionId: 'fader_decrease_stop',
    //						},
    //					],
    //				},
    //			],
    //			feedbacks: [],
    //		})

    self.setPresetDefinitions(presets);
  },
};
