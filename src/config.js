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
          { id: "0", label: "-- Select Model --" },
          { id: "scm", label: "Satellite Control Module" },
          {
            id: "satellitehighlite4k",
            label:
              "Satellite Heads (HIGHlite 4K-UHD & HIGHlite WU, Titan 4K-UHD & Titan WU)",
          },
          { id: "mls10000", label: "MLS 10000,MLS 20000,MLS 30000" },
          {
            id: "titan37000wu",
            label: "Titan Laser 37000WU,Titan Laser 29000WU",
          },
          {
            id: "titan330004k",
            label: "Titan Laser 33000 4K-UHD,Titan  Laser 26000 4K-UHD",
          },
          {
            id: "titan47000wu",
            label: "Titan 47000WU,Titan 43000WU,Titan 42000WU",
          },
          {
            id: "titan410004k",
            label: "Titan 41000 4K-UHD,Titan 37000 4K-UHD",
          },
          { id: "mvisionlaser18k", label: "MVision Laser 18K" },
          {
            id: "mvision27000wu",
            label: "MVision 27000WU, M-Vision 24000 WU, M-Vision 21000 WU II",
          },
          {
            id: "mvision23000wu",
            label: "MVision 23000WU, M-Vision Laser 21K, M-Vision 21000 WU",
          },
          {
            id: "evisionlaser15000wu",
            label: "E-Vision Laser 15K WU, E-Vision 13000WU",
          },
          { id: "evisionlaser110004k", label: "E-Vision Laser 11000 4K-UHD" },
          {
            id: "evision10000iwu",
            label:
              "E-Vision 10000I WU, E-Vision 8000i WU, E-Vision 10000 WU, E-Vision 8000 WU",
          },
          {
            id: "evisionlaser8500",
            label: "E-Vision Laser 8500, E-Vision Laser 7500",
          },
          { id: "ev5100wu", label: "EV5100WU, EV6110WU" },
          { id: "ev5900wu", label: "EV5900WU, EV7010WU" },
        ],
        default: "0",
        useVariables: true,
        isVisible: true,
      },
    ];
  },
};
