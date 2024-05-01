const {
  InstanceBase,
  InstanceStatus,
  runEntrypoint,
} = require("@companion-module/base");
const UpgradeScripts = require("./src/upgrades");
const config = require("./src/config");
const actions = require("./src/actions");
const feedbacks = require("./src/feedbacks");
const variables = require("./src/variables");
const presets = require("./src/presets");
const utils = require("./src/utils");
const satellitehighlite4k = require("./src/models/satellitehighlite4k");
const mls10000 = require("./src/models/mls10000");
const scm = require("./src/models/scm");
const titan37000wu = require("./src/models/titan37000wu");
const titan330004k = require("./src/models/titan330004k");
const titan47000wu = require("./src/models/titan47000wu");
const titan410004k = require("./src/models/titan410004k");
const mvisionlaser18k = require("./src/models/mvisionlaser18k");
const mvision27000wu = require("./src/models/mvision27000wu");
const mvision23000wu = require("./src/models/mvision23000wu");
const evisionlaser15000wu = require("./src/models/evisionlaser15000wu");
const evisionlaser110004k = require("./src/models/evisionlaser110004k");
const evision10000iwu = require("./src/models/evision10000iwu");

class MlsInstance extends InstanceBase {
  constructor(internal) {
    super(internal);

    Object.assign(this, {
      ...config,
      ...actions,
      ...feedbacks,
      ...variables,
      ...presets,
      ...satellitehighlite4k,
      ...mls10000,
      ...scm,
      ...titan37000wu,
      ...titan330004k,
      ...titan47000wu,
      ...titan410004k,
      ...mvisionlaser18k,
      ...mvision27000wu,
      ...mvision23000wu,
      ...evisionlaser15000wu,
      ...evisionlaser110004k,
      ...evision10000iwu,
      ...utils,
    });
  }

  async destroy() {
    if (this.socket !== undefined) {
      this.socket.destroy();
    }
  }

  async init(config) {
    this.configUpdated(config);
  }

  async configUpdated(config) {
    this.config = config;
    await this.initActions();
    this.initFeedbacks();
    await this.initVariables();
    this.initPresets();
    this.updateStatus(InstanceStatus.Connecting);
    this.initTcpConnection();
  }
}

runEntrypoint(MlsInstance, UpgradeScripts);
