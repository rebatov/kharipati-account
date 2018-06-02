const db = (global.appObjectStore.db.find(o => o.name === 'account')).db;
const Admin = db.schemas.find(o => o.modelName === 'Admin').model;

function read(params) {
  return new Promise((resolve, reject) => {
    Admin.find(params.query)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

function create(params) {
  return new Promise((resolve, reject) => {
    Admin.create(params.data)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

function remove(params) {
  return new Promise((resolve, reject) => {
    Admin
      .remove(params.query)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

function update(params) {
  return new Promise((resolve, reject) => {
    Admin
      .update(params.query, params.data)
      .then((result) => { resolve(result); })
      .catch((aErr) => { reject(aErr); });
  });
}

module.exports = {
  read,
  create,
  remove,
  // update,
};