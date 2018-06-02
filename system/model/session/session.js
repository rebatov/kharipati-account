const db = (global.appObjectStore.db.find(o => o.name === 'account')).db;
const Session = db.schemas.find(o => o.modelName === 'Session').model;

function read(params) {
  return new Promise((resolve, reject) => {
    Session.find(params.query)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

function create(params) {
  return new Promise((resolve, reject) => {
    Session.create(params.data)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

function remove(params) {
  return new Promise((resolve, reject) => {
    Session
      .remove(params.query)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

function update(params) {
  return new Promise((resolve, reject) => {
    Session
      .update(params.query, params.data)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

module.exports = {
  read,
  create,
  remove,
  update,
};