const config = require('./config');
const http = require('http');
const express = require('express');
const system = require('./system');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const serverConfig = config.server[env];
const logger = system.getLogger();
const app = express();
config.express(app, config.app);
config.session(app);

const server = {
  start: function start() {
    const routes = require('./server/routes'); // eslint-disable-line global-require

    const httpServer = http.createServer(app);
    if (!module.parent) {
      httpServer.listen(serverConfig.port, serverConfig.ip);
    }
    routes(app);
    logger.info(`Server running at https://localhost:${serverConfig.port}`);
    require('./server/middleware'); // eslint-disable-line global-require
  },
};

/* Create DB then start the app server */
system.createDB()
  .then(() => {
    server.start();
  })
  .catch((aErr) => {
    logger.error(aErr);
  });

module.exports = app;