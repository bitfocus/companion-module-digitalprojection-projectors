module.exports = {
  REQUESTS: [
    { id: "input", type: "dropdown" },
    { id: "resync", type: "function" },
    { id: "test.pattern", type: "dropdown" },
    { id: "auto.source", type: "dropdown" },
    { id: "edid.mode.hdmi", type: "dropdown" },
    { id: "edid.mode.dp", type: "dropdown" },
    { id: "edid.mode.hdbt", type: "dropdown" },
    { id: "lens.lock", type: "dropdown" },
    { id: "zoom.in", type: "function" },
    { id: "zoom.out", type: "function" },
    { id: "focus.near", type: "function" },
    { id: "focus.far", type: "function" },
    { id: "lens.up", type: "function" },
    { id: "lens.down", type: "function" },
    { id: "lens.left", type: "function" },
    { id: "lens.right", type: "function" },
    { id: "lens.center", type: "function" },
    { id: "lens.load", type: "range", range: [0, 10], step: 1 },
    { id: "lens.save", type: "range", range: [0, 10], step: 1 },
    { id: "lens.clear", type: "range", range: [0, 10], step: 1 },
    { id: "gamma", type: "dropdown" },
    { id: "hdr", type: "dropdown" },
    { id: "brightness", type: "range", range: [0, 200] },
    { id: "contrast", type: "range", range: [0, 200] },
    { id: "saturation", type: "range", range: [0, 200] },
    { id: "hue", type: "range", range: [0, 200] },
    { id: "sharpness", type: "range", range: [0, 10] },
    { id: "nr.level", type: "range", range: [0, 3] },
    { id: "freeze", type: "dropdown" },
    { id: "sp.on", type: "dropdown" },
    { id: "brigh.correction", type: "dropdown" },
    { id: "db.on", type: "dropdown" },
    { id: "light.off.timer", type: "dropdown" },
    { id: "color.space", type: "dropdown" },
    { id: "color.mode", type: "dropdown" },
    { id: "color.max", type: "dropdown" },
    { id: "hsg.hue.r", type: "range", range: [0, 1000] },
    { id: "hsg.hue.g", type: "range", range: [0, 1000] },
    { id: "hsg.hue.b", type: "range", range: [0, 1000] },
    { id: "hsg.hue.c", type: "range", range: [0, 1000] },
    { id: "hsg.hue.m", type: "range", range: [0, 1000] },
    { id: "hsg.hue.y", type: "range", range: [0, 1000] },
    { id: "hsg.sat.r", type: "range", range: [0, 1000] },
    { id: "hsg.sat.g", type: "range", range: [0, 1000] },
    { id: "hsg.sat.b", type: "range", range: [0, 1000] },
    { id: "hsg.sat.c", type: "range", range: [0, 1000] },
    { id: "hsg.sat.m", type: "range", range: [0, 1000] },
    { id: "hsg.sat.y", type: "range", range: [0, 1000] },
    { id: "hsg.gain.r", type: "range", range: [0, 1000] },
    { id: "hsg.gain.g", type: "range", range: [0, 1000] },
    { id: "hsg.gain.b", type: "range", range: [0, 1000] },
    { id: "hsg.gain.c", type: "range", range: [0, 1000] },
    { id: "hsg.gain.m", type: "range", range: [0, 1000] },
    { id: "hsg.gain.y", type: "range", range: [0, 1000] },
    { id: "hsg.white.r", type: "range", range: [0, 1000] },
    { id: "hsg.white.g", type: "range", range: [0, 1000] },
    { id: "hsg.white.b", type: "range", range: [0, 1000] },
    { id: "hsg.reset", type: "function" },
    { id: "red.lift", type: "range", range: [0, 200] },
    { id: "green.lift", type: "range", range: [0, 200] },
    { id: "blue.lift", type: "range", range: [0, 200] },
    { id: "red.gain", type: "range", range: [0, 200] },
    { id: "green.gain", type: "range", range: [0, 200] },
    { id: "blue.gain", type: "range", range: [0, 200] },
    { id: "gainlift.reset", type: "function" },
    { id: "color.temp", type: "dropdown" },
    { id: "aspect.ratio", type: "dropdown" },
    { id: "digi.zoom", type: "range", range: [0, 100] },
    { id: "digi.pan", type: "range", range: [-1280, 1280] },
    { id: "digi.scan", type: "range", range: [-720, 720] },
    { id: "overscan", type: "dropdown" },
    { id: "blanking.top", type: "range", range: [0, 360] },
    { id: "blanking.bottom", type: "range", range: [0, 360] },
    { id: "blanking.left", type: "range", range: [0, 534] },
    { id: "blanking.right", type: "range", range: [0, 534] },
    { id: "blanking.reset", type: "function" },
    { id: "orientation", type: "dropdown" },
    { id: "altitude", type: "dropdown" },
    { id: "date" },
    { id: "time.zone", type: "range", range: [-11, 12] },
    { id: "time.adjust" },
    { id: "startup.logo", type: "dropdown" },
    { id: "blank.screen", type: "dropdown" },
    { id: "pic.mute.cfg", type: "dropdown" },
    { id: "smear.reduction", type: "dropdown" },
    { id: "output.framerate", type: "dropdown" },
    { id: "hdmi.eq", type: "dropdown" },
    { id: "laser.cal", type: "dropdown" },
    { id: "screen.setting", type: "dropdown" },
    { id: "screen.position" },
    { id: "auto.poweroff", type: "dropdown" },
    { id: "auto.poweron", type: "dropdown" },
    { id: "schedule.power", type: "dropdown" },
    { id: "schedule1.on.day" },
    { id: "schedule1.off.day" },
    { id: "schedule1.on.time" },
    { id: "schedule1.off.time" },
    { id: "schedule2.on.day" },
    { id: "schedule2.off.day" },
    { id: "schedule2.on.time" },
    { id: "schedule2.off.time" },
    { id: "instant.startup", type: "dropdown" },
    { id: "standby.period", type: "dropdown" },
    { id: "user.std.rx/user.std.ry" },
    { id: "user.std.gx/user.std.gy" },
    { id: "user.std.bx/user.std.by" },
    { id: "user.std.wx/user.std.wy" },
    { id: "user.std.reset", type: "function" },
    { id: "user.target.rx/user.target.ry" },
    { id: "user.target.gx/user.target.gy" },
    { id: "user.target.bx/user.target.by" },
    { id: "user.target.yx/user.target.yy" },
    { id: "user.target.cx/user.target.cy" },
    { id: "user.target.mx/user.target.my" },
    { id: "user.target.wx/user.target.wy" },
    { id: "user.target.reset" },
    { id: "user2.target.rx/user2.target.ry" },
    { id: "user2.target.gx/user2.target.gy" },
    { id: "user2.target.bx/user2.target.by" },
    { id: "user2.target.yx/user2.target.yy" },
    { id: "user2.target.cx/user2.target.cy" },
    { id: "user2.target.mx/user2.target.my" },
    { id: "user2.target.wx/user2.target.wy" },
    { id: "user2.target.reset", type: "function" },
    { id: "ir.enable", type: "dropdown" },
    { id: "ir.code", type: "range", range: [0, 99] },
    { id: "ir.code.rst", type: "function" },
    { id: "hotkey1", type: "dropdown" },
    { id: "hotkey2", type: "dropdown" },
    { id: "hotkey3", type: "dropdown" },
    { id: "key.backlight", type: "dropdown" },
    { id: "osd.lang", type: "dropdown" },
    { id: "osd.menupos", type: "dropdown" },
    { id: "osd.timer", type: "dropdown" },
    { id: "osd.rotation", type: "dropdown" },
    { id: "standby.mode", type: "dropdown" },
    { id: "recall.mem", type: "dropdown" },
    { id: "save.mem", type: "dropdown" },
    { id: "osd.pin.enable", type: "dropdown" },
    { id: "osd.pin", type: "range", range: [0, 9999] },
    { id: "osd.pin.reset", type: "function" },
    { id: "model.name", type: "info" },
    { id: "serial", type: "info" },
    { id: "sw.version", type: "info" },
    { id: "sw1.version", type: "info" },
    { id: "sw2.version", type: "info" },
    { id: "sw3.version", type: "info" },
    { id: "laser.hours", type: "info" },
    { id: "ac.voltage", type: "info" },
    { id: "laser.temp", type: "info" },
    { id: "act.source", type: "info" },
    { id: "signal", type: "info" },
    { id: "h.refresh", type: "info" },
    { id: "v.refresh", type: "info" },
    { id: "pixel.clock", type: "info" },
    { id: "color.format", type: "info" },
    { id: "hdr.format", type: "info" },
    { id: "atmos.alti", type: "info" },
    { id: "atmos.pressure", type: "info" },
    { id: "altitude.info", type: "info" },
    { id: "total.hours", type: "info" },
    { id: "laser.power.info", type: "info" },
    { id: "ti", type: "info" },
    { id: "tc.r", type: "info" },
    { id: "tc.g", type: "info" },
    { id: "tc.b", type: "info" },
    { id: "fans", type: "info" },
    { id: "water.pump1", type: "info" },
    { id: "water.pump2", type: "info" },
    { id: "factory.reset", type: "function" },
    { id: "power", type: "dropdown" },
    { id: "pic.mute", type: "dropdown" },
    { id: "status", type: "dropdown" },
    { id: "errcode", type: "info" },
    { id: "err.reset", type: "function" },
    { id: "resolution.x", type: "range", range: [0, 1920] },
    { id: "resolution.y", type: "range", range: [0, 1200] },
    { id: "pj.color", type: "dropdown" },
    { id: "laser.hours", type: "info" },
    { id: "laser.mode", type: "dropdown" },
    { id: "laser.power", type: "range", range: [30, 100] },
    { id: "laser.cbc.enable", type: "dropdown" },
    { id: "laser.cbc.target", type: "range", range: [0, 65535] },
    { id: "laser.cbc.state", type: "info" },
  ],
  STATUS: [
    { id: 0, label: "Standby" },
    { id: 1, label: "Warm Up" },
    { id: 2, label: "Imaging" },
    { id: 3, label: "Cooling" },
    { id: 4, label: "Warning" },
  ],
  INPUT: [
    { id: 0, label: "HDMI" },
    { id: 1, label: "HDBaseT" },
    { id: 2, label: "DisplayPort" },
  ],
  TEST_PATTERN: [
    { id: 0, label: "Off" },
    { id: 1, label: "White" },
    { id: 2, label: "Black" },
    { id: 3, label: "Red" },
    { id: 4, label: "Green" },
    { id: 5, label: "Blue" },
    { id: 6, label: "Checkboard" },
    { id: 7, label: "CrossHatch" },
    { id: 8, label: "V Burst" },
    { id: 9, label: "H Burst" },
    { id: 10, label: "ColorBar" },
    { id: 11, label: "Plunge" },
  ],
  AUTO_SOURCE: [
    { id: 0, label: "Off" },
    { id: 1, label: "On" },
  ],
  EDID_MODE_HDMI: [
    { id: 0, label: "4K/60 HDR" },
    { id: 1, label: "4K/30" },
    { id: 2, label: "1920x1200p60" },
    { id: 3, label: "1920x1080p60" },
    { id: 4, label: "11280x800p60" },
  ],
  EDID_MODE_DP: [
    { id: 0, label: "4K/60 HDR" },
    { id: 1, label: "4K/30" },
    { id: 2, label: "1920x1200p60" },
    { id: 3, label: "1920x1080p60" },
    { id: 4, label: "11280x800p60" },
  ],
  EDID_MODE_HDBT: [
    { id: 0, label: "4K/30" },
    { id: 1, label: "1920x1200p60" },
    { id: 2, label: "1920x1080p60" },
    { id: 3, label: "11280x800p60" },
  ],
  LENS_LOCK: [
    { id: 0, label: "Off" },
    { id: 1, label: "On" },
  ],
  GAMMA: [
    { id: 0, label: "1.0" },
    { id: 1, label: "1.8" },
    { id: 2, label: "2.0" },
    { id: 3, label: "2.2" },
    { id: 4, label: "2.35" },
    { id: 5, label: "2.5" },
    { id: 6, label: "DICOM" },
  ],
  HDR: [
    { id: 0, label: "Off" },
    { id: 1, label: "Auto" },
    { id: 2, label: "HDR-PQ400" },
    { id: 3, label: "HDR-PQ500" },
    { id: 4, label: "HDR-PQ1000" },
    { id: 5, label: "HDR-HLG" },
  ],
  FREEZE: [
    { id: 0, label: "Off" },
    { id: 1, label: "On" },
  ],
  BRIGH_CORRECTION: [
    { id: 0, label: "Off" },
    { id: 1, label: "BC1" },
    { id: 2, label: "BC2" },
    { id: 3, label: "BC3" },
    { id: 4, label: "BC4" },
    { id: 5, label: "BC5" },
    { id: 6, label: "BC6" },
  ],
  //  DB_ON: [
  //    { id: 0, label: "Off" },
  //    { id: 1, label: "On" },
  //  ],
  LIGHT_OFF_TIMER: [
    { id: 0, label: "Reserved" },
    { id: 1, label: "0.5s" },
    { id: 2, label: "1s" },
    { id: 3, label: "1.5s" },
    { id: 4, label: "2s" },
    { id: 5, label: "3s" },
    { id: 6, label: "4s" },
  ],
  COLOR_SPACE: [
    { id: 0, label: "Auto" },
    { id: 1, label: "YPbPr" },
    { id: 2, label: "YCbCr" },
    { id: 3, label: "RGB-PC" },
    { id: 4, label: "RGB-Video" },
  ],
  COLOR_MODE: [
    { id: 0, label: "ColorMax" },
    { id: 1, label: "Manual Color Matching" },
    { id: 2, label: "Color Temperature" },
    { id: 3, label: "Gains and Lifts" },
  ],
  COLOR_MAX: [
    { id: 0, label: "REC709" },
    { id: 1, label: "Extended" },
    { id: 2, label: "Ultra" },
    { id: 3, label: "Peak" },
    { id: 4, label: "User1" },
    { id: 5, label: "User2" },
  ],
  COLOR_TEMP: [
    { id: 0, label: "3200K" },
    { id: 1, label: "5400K" },
    { id: 2, label: "6500K" },
    { id: 3, label: "7500K" },
    { id: 4, label: "9300K" },
    { id: 5, label: "Native" },
  ],
  ASPECT_RATIO: [
    { id: 0, label: "5:4" },
    { id: 1, label: "4:3" },
    { id: 2, label: "16:10" },
    { id: 3, label: "16:9" },
    { id: 4, label: "1.88" },
    { id: 5, label: "2.35" },
    { id: 6, label: "TheaterScope" },
    { id: 7, label: "Source" },
    { id: 8, label: "Unscaled" },
  ],
  OVERSCAN: [
    { id: 0, label: "Off" },
    { id: 1, label: "Crop" },
    { id: 2, label: "Zoom" },
  ],
  ORIENTATION: [
    { id: 0, label: "Front Tabletop" },
    { id: 1, label: "Front Ceiling" },
    { id: 2, label: "Rear Tabletop" },
    { id: 3, label: "Rear Ceiling" },
    { id: 4, label: "Auto-front" },
  ],
  ALTITUDE: [
    { id: 0, label: "Off" },
    { id: 1, label: "On" },
    { id: 2, label: "Auto" },
    { id: 3, label: "Quiet" },
  ],
  BLANK_SCREEN: [
    { id: 0, label: "Logo" },
    { id: 1, label: "Black" },
    { id: 2, label: "Blue" },
    { id: 3, label: "White" },
  ],
  PIC_MUTE_CFG: [
    { id: 0, label: "DMD Blanking" },
    { id: 1, label: "Laser" },
  ],
  SMEAR_REDUCTION: [
    { id: 0, label: "Off" },
    { id: 1, label: "6ms" },
    { id: 2, label: "7ms" },
    { id: 3, label: "8ms" },
    { id: 4, label: "9ms" },
    { id: 5, label: "10ms" },
  ],
  OUTPUT_FRAMERATE: [
    { id: 0, label: "Auto" },
    { id: 1, label: "48Hz" },
    { id: 2, label: "50Hz" },
    { id: 3, label: "60Hz" },
  ],
  HDMI_EQ: [
    { id: 0, label: "Auto" },
    { id: 1, label: "High" },
    { id: 2, label: "Middle" },
    { id: 3, label: "Low" },
  ],
  LASER_CAL: [
    { id: 0, label: "Disable" },
    { id: 1, label: "Enable" },
  ],
  SCREEN_SETTING: [
    { id: 0, label: "16:10" },
    { id: 1, label: "16:9" },
    { id: 2, label: "4:3" },
    { id: 3, label: "2.35:1" },
  ],
  OSD_LANG: [
    { id: 0, label: "English" },
    { id: 1, label: "French" },
    { id: 2, label: "Spanish" },
    { id: 3, label: "German" },
    { id: 4, label: "NA" },
    { id: 5, label: "Simplified Chinese" },
    { id: 6, label: "Traditional Chinese" },
    { id: 7, label: "Japanese" },
    { id: 8, label: "Korean" },
  ],
  OSD_MENUPOS: [
    { id: 0, label: "Top Left" },
    { id: 1, label: "Top Right" },
    { id: 2, label: "Bottom Left" },
    { id: 3, label: "Bottom Right" },
    { id: 4, label: "Center" },
  ],
  OSD_TIMER: [
    { id: 0, label: "Always On" },
    { id: 1, label: "10 Seconds" },
    { id: 2, label: "30 Seconds" },
    { id: 3, label: "60 Seconds" },
  ],
  OSD_ROTATION: [
    { id: 0, label: "Off" },
    { id: 1, label: "Clockwise" },
    { id: 2, label: "Counterclockwise" },
  ],
  STANDBY_MODE: [
    { id: 0, label: "SuperECO" },
    { id: 1, label: "ECO" },
    { id: 2, label: "Normal" },
  ],
  RECALL_MEM: [
    { id: 0, label: "Preset A" },
    { id: 1, label: "Preset B" },
    { id: 2, label: "Preset C" },
    { id: 3, label: "Preset D" },
    { id: 4, label: "Default" },
  ],
  //  SAVE_MEM: [
  //    { id: 0, label: "Preset A" },
  //    { id: 1, label: "Preset B" },
  //    { id: 2, label: "Preset C" },
  //    { id: 3, label: "Preset D" },
  //  ],
  POWER: [
    { id: 0, label: "Off" },
    { id: 1, label: "On" },
  ],
  PIC_MUTE: [
    { id: 0, label: "Open" },
    { id: 1, label: "Close" },
  ],
  LASER_MODE: [
    { id: 0, label: "Eco" },
    { id: 1, label: "Normal" },
    { id: 2, label: "Custom" },
  ],
};