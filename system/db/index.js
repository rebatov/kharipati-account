require('../global');
const Db = require('./db');
const config = require('./config');
const logger = require('../logger')();

module.exports.create = () => {
  const db = Db.create(config.db.find(o => o.name === 'account'));
  return new Promise((onResolve, onReject) => {
    db
      .connect()
      .then(() => {
        logger.info(`database account connected on port ${db.connection.port}`);
        db
          .loadSchema()
          .then(() => {
            logger.info('schemas loaded');
            onResolve(db);
          });
      })
      .catch((aErr) => {
        logger.error('Database connection..');
        onReject(aErr);
      });
  });
};