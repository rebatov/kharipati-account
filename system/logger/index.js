'use strict';

require('../global');
const winston = require('winston');
const config = require('./config');

module.exports = () => {
  if (global.appObjectStore
    && global.appObjectStore.logger.infoLogger) {
    return global.appObjectStore.logger.infoLogger;
  }
  const infoLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)(config),
      new (winston.transports.Console)({
        level: 'info',
        colorize: true,
      }),
    ],
  });
  return infoLogger;
};
