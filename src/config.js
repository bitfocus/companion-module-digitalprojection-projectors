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
          { id: "scm", label: "Satellite Control Module" },
          {
            id: "satellitehighlite4k",
            label: "Satellite HIGHlite Head 4K-UHD",
          },
          { id: "mls10000", label: "MLS 10000" },
          { id: "titan37000wu", label: "Titan 37000WU" },
          { id: "titan330004k", label: "Titan 33000 4K-UHD" },
          { id: "titan47000wu", label: "Titan 47000WU" },
          { id: "titan410004k", label: "Titan 41000 4K-UHD" },
          { id: "mvisionlaser18k", label: "MVision Laser 18K" },
        ],
        default: "unknown",
        useVariables: true,
        isVisible: true,
      },
    ];
  },
};
