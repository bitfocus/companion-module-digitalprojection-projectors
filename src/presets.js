const { combineRgb } = require("@companion-module/base");
const actions = require("./actions");
const variables = require("./variables");
const feedbacks = require("./feedbacks");

module.exports = {
  initPresets: function () {
    let self = this;
    let presets = [];

    const foregroundColor = combineRgb(255, 255, 255); // White
    const foregroundColorBlack = combineRgb(0, 0, 0);
    const backgroundColorRed = combineRgb(255, 0, 0); // Red
    const backgroundColorGreen = combineRgb(0, 255, 0); // Green

    let model = self.config.model.toUpperCase();
    let instanceId = self.label;

    //self.log("debug", "instanceId: " + instanceId);
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
                    //self.log(
                    //  "debug",
                    //  "adding dropdown preset: " + command.Name
                    //);
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
                        color: foregroundColorBlack,
                        bgcolor: backgroundColorGreen,
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
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                          },
                          options: [
                            { value: self.getVariableValue(variableId) },
                          ],
                        },
                      ],
                    });
                  } else {
                    {
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
                          bgcolor: backgroundColorGreen,
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
                              color: foregroundColor,
                              bgcolor: backgroundColorRed,
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
                  //Range presets
                  //self.log("debug", "adding range preset: " + command.Name);
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
                      color: foregroundColorBlack,
                      bgcolor: backgroundColorGreen,
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
                          color: foregroundColor,
                          bgcolor: backgroundColorRed,
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
                    color: foregroundColorBlack,
                    bgcolor: backgroundColorGreen,
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
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
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
          }
        }
      });
    }

    self.setPresetDefinitions(presets);
  },
};
