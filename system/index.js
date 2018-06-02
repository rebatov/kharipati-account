require('./global');
const logger = require('./logger')();
const db = require('./db');

module.exports.getLogger = () => {
  // Only one logger is used for now
  const r = logger;
  global.appObjectStore.logger = logger;
  return r;
};

module.exports.createDB = () => {
  // created db
  const cb = (resolve, reject) => {
    db.create()
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  };

  return new Promise(cb);
};

module.exports.getMongooseModel = (modelName) => {
  // Default
  const lTDb = (global.appObjectStore.db.find(o => o.name === 'account')).db;
  return lTDb.getModel(modelName);
};

module.exports.logger = logger;