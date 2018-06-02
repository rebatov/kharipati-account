const session = require('./session');

module.exports = {
  get: session.read,
  post: session.create,
  put: session.update,
  delete: session.remove,
};