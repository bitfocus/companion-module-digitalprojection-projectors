const { Regex } = require("@companion-module/base");

module.exports = {
  getConfigFields() {
    let self = this;

    return [
      {
        type: "static-text",
        id: "info",
        label: "Information",
        width: 12,
        value: `
				<div class="alert alert-danger">
					<h3>IMPORTANT MESSAGE</h3>
					<div>
					</div>
				</div>
			`,
      },
      {
        type: "textinput",
        id: "host",
        label: "TCPTarget IP",
        width: 8,
        regex: Regex.IP,
      },
      {
        type: "textinput",
        id: "tcpPort",
        label: "TCP Target Port",
        width: 4,
        default: 7000,
        regex: Regex.PORT,
      },
      {
        type: "dropdown",
        id: "model",
        label: "Device model",
        choices: [
          { id: "unknown", label: "unknown" },
          { id: "scm", label: "SCM" },
          { id: "highlite", label: "HIGHlite Head" },
          { id: "mls", label: "MLS" },
          { id: "titan37000wu", label: "Titan 37000WU" },
          { id: "titan330004k", label: "Titan 330004K-UHD" },
        ],
        default: "unknown",
        useVariables: true,
        isVisible: true,
      },
    ];
  },
};
