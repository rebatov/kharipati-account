const admin = require('./admin');

module.exports = {
  get: admin.read,
  post: admin.create,
  // put: client.update,
  delete: admin.remove,
};