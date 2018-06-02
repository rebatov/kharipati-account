'use strict';

const config = require('../../config').app;

global.xRootDir = config.rootPath;
global.xWorkDir = config.rootPath;

function init() {
  if (!global.appObjectStore) {
    global.appObjectStore = {
      domains: [],
      db: [],
      logger: {},
    };
  }
}

module.exports = init();
