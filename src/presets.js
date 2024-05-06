const { combineRgb } = require("@companion-module/base");
const actions = require("./actions");
const variables = require("./variables");
const feedbacks = require("./feedbacks");

module.exports = {
  initPresets: function () {
    let self = this;
    let presets = [];

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
    let instanceId = self.label;

    if (self[model] !== undefined) {
      self[model].forEach((command) => {
        let variableId = "";
        if (!command.Name.includes("xxx")) {
          if (command.Settings.toString().includes("?")) {
            if (command.CmdStr.includes(".")) {
              variableId = command.CmdStr.split(".");
              if (variableId.length === 2) {
                variableId = variableId[0] + "_" + variableId[1];
              } else if (variableId.length === 3) {
                variableId =
                  variableId[0] + "_" + variableId[1] + "_" + variableId[2];
              }
            } else {
              variableId = command.CmdStr;
            }
            if (variableId !== "") {
              if (
                command.Settings.toString().includes("?") &&
                !command.Name.includes("xxx") &&
                command.Name !== ""
              ) {
                let dataKeys = [];
                let previousDataValueWasEmpty = true;
                let list = [];
                dataKeys = Object.keys(command).filter((key) =>
                  key.startsWith("data")
                );
                for (let i = dataKeys.length - 1; i >= 0; i--) {
                  let dataKey = dataKeys[i];
                  let dataValue = command[dataKey];
                  if (dataValue !== "") {
                    list[i] = { id: i, label: dataValue };
                    previousDataValueWasEmpty = false;
                  } else if (!previousDataValueWasEmpty) {
                    list[i] = { id: i, label: "" };
                    previousDataValueWasEmpty = true;
                  }
                }
                //Search for "dropdown" commands
                if (list.length > 0) {
                  if (list.length !== 2) {
                    //Dropdown presets
                    let key = "id_" + command.Name;

                    presets.push({
                      type: "button",
                      category: command.Category + " - ChoiceList",
                      name: command.Name,
                      style: {
                        text:
                          "concat('" +
                          command.Name +
                          ": ' ,$(" +
                          instanceId +
                          ":" +
                          variableId +
                          "))",
                        textExpression: true,
                        size: "14",
                        color: PolarNight0,
                        bgcolor: auroraPurple,
                      },
                      steps: [
                        {
                          down: [
                            {
                              actionId: command.Name,
                              options: {
                                [key]: list[0].id,
                              },
                            },
                          ],
                          up: [],
                        },
                      ],
                      feedbacks: [
                        {
                          feedbackId: variableId,
                          style: {
                            color: PolarNight0,
                            bgcolor: backgroundColorOrange,
                          },
                          options: [
                            { value: self.getVariableValue(variableId) },
                          ],
                        },
                      ],
                    });
                  } else if (
                    list[0].label === "Off" &&
                    list[1].label === "On"
                  ) {
                    {
                      //Toggle ON/OFF presets
                      let key = "id_" + command.Name;
                      presets.push({
                        type: "button",
                        category: command.Category + " - ToggleList",
                        name: command.Name,
                        style: {
                          text:
                            "concat('" +
                            command.Name +
                            ": ' ,$(" +
                            instanceId +
                            ":" +
                            variableId +
                            "))",
                          textExpression: true,
                          size: "14",
                          color: PolarNight0,
                          bgcolor: backgroundColorOrange,
                        },
                        steps: [
                          {
                            down: [
                              {
                                actionId: command.Name,
                                options: {
                                  [key]: list[0].id,
                                },
                              },
                            ],
                            up: [],
                          },
                          {
                            down: [
                              {
                                actionId: command.Name,
                                options: {
                                  [key]: list[1].id,
                                },
                              },
                            ],
                            up: [],
                          },
                        ],
                        feedbacks: [
                          {
                            feedbackId: "On",
                            style: {
                              color: PolarNight0,
                              bgcolor: auroraGreen,
                            },
                            options: {
                              value: variableId,
                            },
                          },
                          {
                            feedbackId: "Off",
                            style: {
                              color: snow1,
                              bgcolor: auroraRed,
                            },
                            options: {
                              value: variableId,
                            },
                          },
                        ],
                      });
                    }
                  } else {
                    {
                      for (element in list) {
                      }
                      //Toggle presets
                      let key = "id_" + command.Name;
                      presets.push({
                        type: "button",
                        category: command.Category + " - ToggleList",
                        name: command.Name,
                        style: {
                          text:
                            "concat('" +
                            command.Name +
                            ": ' ,$(" +
                            instanceId +
                            ":" +
                            variableId +
                            "))",
                          textExpression: true,
                          size: "14",
                          color: foregroundColorBlack,
                          bgcolor: backgroundColorCyan,
                        },
                        steps: [
                          {
                            down: [
                              {
                                actionId: command.Name,
                                options: {
                                  [key]: list[0].id,
                                },
                              },
                            ],
                            up: [],
                          },
                          {
                            down: [
                              {
                                actionId: command.Name,
                                options: {
                                  [key]: list[1].id,
                                },
                              },
                            ],
                            up: [],
                          },
                        ],
                        feedbacks: [
                          {
                            feedbackId: variableId,
                            style: {
                              color: PolarNight0,
                              bgcolor: backgroundColorOrange,
                            },
                            options: [
                              { value: self.getVariableValue(variableId) },
                            ],
                          },
                        ],
                      });
                    }
                  }
                } else if (
                  command.Settings.includes("?=+-") &&
                  command.min !== "" &&
                  command.max !== "" &&
                  command.Name !== ""
                ) {
                  presets.push({
                    type: "button",
                    category: command.Category + " - Value",
                    name: command.Name,
                    style: {
                      text:
                        "concat('" +
                        command.Name +
                        ": ' ,$(" +
                        instanceId +
                        ":" +
                        variableId +
                        "))",
                      textExpression: true,
                      size: "14",
                      color: PolarNight0,
                      bgcolor: auroraBlue,
                    },
                    steps: [
                      {
                        down: [
                          {
                            actionId: command.Name,
                          },
                        ],
                        up: [],
                      },
                    ],
                    feedbacks: [
                      {
                        feedbackId: variableId,
                        style: {
                          color: PolarNight0,
                          bgcolor: backgroundColorOrange,
                        },
                        options: [{ value: self.getVariableValue(variableId) }],
                      },
                    ],
                  });
                }
              } else if (
                !command.Name.includes("xxx") &&
                command.Settings === "" &&
                command.Name !== ""
              ) {
                //Simple presets
                presets.push({
                  type: "button",
                  category: command.Category + " - Execute",
                  name: command.Name,
                  style: {
                    text:
                      "concat('" +
                      command.Name +
                      ": ' ,$(" +
                      instanceId +
                      ":" +
                      variableId +
                      "))",
                    textExpression: true,
                    size: "14",
                    color: PolarNight0,
                    bgcolor: auroraBlue,
                  },
                  steps: [
                    {
                      down: [
                        {
                          actionId: command.Name,
                        },
                      ],
                      up: [],
                    },
                  ],
                  feedbacks: [
                    {
                      feedbackId: variableId,
                      style: {
                        color: PolarNight0,
                        bgcolor: backgroundColorOrange,
                      },
                      options: [{ value: self.getVariableValue(variableId) }],
                    },
                  ],
                });
              }
            }
          } else if (
            command.Settings.includes("?=+-") &&
            command.min !== "" &&
            command.max !== "" &&
            command.Name !== ""
          ) {
            //  None Preset
            presets.push({
              type: "button",
              category: command.Category + " - ?",
              name: command.Name,
              style: {
                text: command.Name,
                textExpression: true,
                size: "14",
                color: "16777215",
                bgcolor: combineRgb(0, 0, 0),
              },
              steps: [
                {
                  down: [
                    {
                      actionId: command.Name,
                    },
                  ],
                  up: [],
                },
              ],
            });
          } else if (
            !command.Name.includes("xxx") &&
            command.Settings === "" &&
            command.Name !== ""
          ) {
            presets.push({
              //  Execute Preset
              type: "button",
              category: command.Category + " - Execute",
              name: command.Name,
              style: {
                text: command.Name,
                size: "14",
                color: foregroundColorBlack,
                bgcolor: backgroundColorMagenta,
              },
              steps: [
                {
                  down: [
                    {
                      actionId: command.Name,
                    },
                  ],
                  up: [],
                },
              ],
            });
          }
        }
      });
    }

    self.setPresetDefinitions(presets);
  },
};
