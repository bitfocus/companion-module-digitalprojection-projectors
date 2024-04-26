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
        id: "deviceType",
        label: "Device Type",
        choices: [
          { id: "unknown", label: "unknown" },
          { id: "scm", label: "SCM" },
          { id: "sph", label: "SPH" },
          { id: "mls", label: "MLS" },
        ],
        default: "unknown",
        useVariables: true,
        isVisible: true,
      },
      //      {
      //        type: "textinput",
      //        id: "udpPort",
      //        label: "UDP Target Port",
      //        width: 4,
      //        default: 30718,
      //        regex: Regex.PORT,
      //      },
      //{
      //  type: "checkbox",
      //  id: "incremental",
      //  label: "use increment in place of number",
      //  default: false,
      //},
    ];
  },
};
