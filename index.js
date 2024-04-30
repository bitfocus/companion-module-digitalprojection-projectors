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
const constants = require("./src/constants");
const utils = require("./src/utils");
const highlite = require("./src/models/highlite");
const mls = require("./src/models/mls");
const scm = require("./src/models/scm");
const titan37000wu = require("./src/models/titan37000wu");
const titan330004k = require("./src/models/titan330004k");

class MlsInstance extends InstanceBase {
  constructor(internal) {
    super(internal);

    Object.assign(this, {
      ...config,
      ...actions,
      ...feedbacks,
      ...variables,
      ...presets,
      ...constants,
      ...highlite,
      ...mls,
      ...scm,
      ...titan37000wu,
      ...titan330004k,
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
    this.initActions();
    this.initFeedbacks();
    this.initVariables();
    this.initPresets();
    this.updateStatus(InstanceStatus.Connecting);
    this.initTcpConnection();
  }
}

runEntrypoint(MlsInstance, UpgradeScripts);
