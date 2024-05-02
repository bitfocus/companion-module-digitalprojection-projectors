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
const titan37000wu = require("./src/models/titanlaser37000wu");
const titan330004k = require("./src/models/titanlaser330004k");
const titan47000wu = require("./src/models/titan47000wu");
const titan410004k = require("./src/models/titan410004k");
const mvisionlaser18k = require("./src/models/mvisionlaser18k");
const mvision27000wu = require("./src/models/mvision27000wu");
const mvision23000wu = require("./src/models/mvision23000wu");
const evisionlaser15000wu = require("./src/models/evisionlaser15000wu");
const evisionlaser110004k = require("./src/models/evisionlaser110004k");
const evision10000iwu = require("./src/models/evision10000iwu");
const evisionlaser8500 = require("./src/models/evisionlaser8500");
const ev5100wu = require("./src/models/ev5100wu");
const ev5900wu = require("./src/models/ev5900wu");
const ev6500ii = require("./src/models/ev6500ii");
const ev9000 = require("./src/models/ev9000");
const evision4k = require("./src/models/evision4k");
const evision9100wu = require("./src/models/evision9100wu");
const evision10000wu = require("./src/models/evision10000wu");
const evisionlaser4k = require("./src/models/evisionlaser4k");
const evisionlaser10k = require("./src/models/evisionlaser10k");
const evisionlaser13k = require("./src/models/evisionlaser13k");
const highlite4k = require("./src/models/highlite4k");
const highlitelaser3d = require("./src/models/highlitelaser3d");
const highlitelaserii3d = require("./src/models/highlitelaserii3d");

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
      ...evisionlaser8500,
      ...ev5100wu,
      ...ev5900wu,
      ...ev6500ii,
      ...ev9000,
      ...evision4k,
      ...evision9100wu,
      ...evision10000wu,
      ...evisionlaser4k,
      ...evisionlaser10k,
      ...evisionlaser13k,
      ...highlite4k,
      ...highlitelaser3d,
      ...highlitelaserii3d,
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
