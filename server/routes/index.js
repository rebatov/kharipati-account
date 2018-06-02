// const config = require('../../config').app;
const client = require('../controller/client');
const admin = require('../controller/admin');
const user = require('../middleware/user.middleware.js');

console.log(user.login);

module.exports = (app) => {
  /*
    Route for user log in and log out
  */
  // app.get('/api/account/logout', user.logout);
  app.get('/', (req, res) => {
    if (req.session && req.session.user_id) {
      return res.redirect('/admin-dashboard');
    }
  });
  app.use('/api/account/client', client);
  app.use('/api/account/admin', admin);
  app.post('/api/account/login', user.login);
  app.get('/api/account/logout', user.logout);

  app.all('/*', (req, res) => {
    const obj = {
      code: 404,
      error: 'not_found',
      error_description: 'Path not found!!',
    };
    res.status(404).send(obj);
  });
};