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
					<h3>Module based on Digital Projection command protocols available on Digital Projection website</h3>
					<div>
          Actions, Variables and Presets are automatically generated based on available commands for model selected.
          At connection creation, Initial requests to populate variables values are sent.
					</div>
				</div>
			`,
      },
      {
        type: "textinput",
        id: "host",
        label: "TCP Target IP",
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
          { id: "highlite4k", label: "HIGHlite 4K" },
          { id: "highlitelaser3d", label: "HIGHlite Laser 3D" },
          { id: "highlitelaserii3d", label: "HIGHlite Laser II 3D" },
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
          { id: "evisionlaser13k", label: "E-Vision Laser 13K" },
          { id: "evisionlaser110004k", label: "E-Vision Laser 11000 4K-UHD" },

          { id: "evision10000wu", label: "E-Vision 10000WU" },
          {
            id: "evision10000iwu",
            label:
              "E-Vision 10000I WU, E-Vision 8000i WU, E-Vision 10000 WU, E-Vision 8000 WU",
          },
          { id: "evisionlaser10k", label: "E-Vision Laser 10K" },
          { id: "evision9100wu", label: "E-Vision 9100WU" },
          {
            id: "evisionlaser8500",
            label: "E-Vision Laser 8500, E-Vision Laser 7500",
          },
          { id: "evision4k", label: "E-Vision 4K-UHD" },
          { id: "evisionlaser4k", label: "E-Vision Laser 4K" },
          { id: "ev9000", label: "EV9000" },
          { id: "ev6500ii", label: "EV6500II" },
          { id: "ev5900wu", label: "EV5900WU, EV7010WU" },
          { id: "ev5100wu", label: "EV5100WU, EV6110WU" },
        ],
        default: "0",
        useVariables: true,
        isVisible: true,
      },
      {
        type: "number",
        id: "timeout",
        label: "Initial requests polling rate (ms)",
        min: 500,
        max: 5000,

        default: 1100,
      },
      {
        type: "dropdown",
        id: "refresh",
        label: "refresh variables polling rate (min)",
        choices: [
          { id: "60000", label: "1 min" },
          { id: "120000", label: "2 min" },
          { id: "180000", label: "3 min" },
          { id: "240000", label: "4 min" },
          { id: "300000", label: "5 min" },
        ],

        default: "300000",
        useVariables: true,
        isVisible: true,
      },
    ];
  },
};
