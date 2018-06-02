/* eslint-disable no-param-reassign, no-underscore-dangle */
const logger = global.appObjectStore.logger;
const config = require('../../config').app;
const session = require('./session.middleware');
const helper = require('./helper');
const Admin = require('../model/admin');
const lib = require('../../lib/helper.lib.js');

/*
  to make user login
*/
const checkLogin = (req) => new Promise((resolve, reject) => {
  const x = req.body;
  console.log('@check login', req.body);
  if (x && x.password && x.username) {
    Admin
      .get({
        query: {
          username: x.username,
        },
      })
      .then((d) => {
        console.log('d', d);
        if (d && d.length === 1) {
          if (d[0].password && d[0].password === lib.encryptPassword(x.password)) {
            logger.info(`@user.controller @login :: ${d[0].username}`);
            d[0].password = undefined; // eslint-disable-line no-param-reassign
            d[0].__v = undefined; // eslint-disable-line no-param-reassign, no-underscore-dangle
            // lib.handleSuccess(res, d[0]);
            resolve(d[0]);
          } else {
            // lib.handleError(res, 400);
            reject({
              code: 401,
              errType: 'decryption',
            });
          }
        } else {
          // lib.handleError(res, 400);
          reject({
            code: 400,
            errType: 'bad-request',
          });
        }
      })
      .catch((e) => {
        logger.error(`@user.controller @login :: ${e}`);
        // lib.handleError(res, 500);
        reject({
          code: 400,
          errType: 'bad-request',
        });
      });
  } else {
    // lib.handleError(res, 400);
    reject({
      code: 400,
      errType: 'bad-request',
    });
  }
});


/*
  to make user login
*/
module.exports.login = (req, res) => {
  const x = req.body;
  console.log(req.body);
  if (x && x.username && x.password) {
    if (req.session && req.session.username) {
      helper.handleSuccess(res, { user_key: req.session.session_id });
    } else {
      checkLogin(req).then((d) => {
        console.log('After login', d);
        session.handleSession(d)
          .then((data) => {
            if (req.session) {
              req.session.session_id = data.session_id;
              req.session.username = data.username;
              req.session.super_admin = data.super_admin;
            }
            console.log('@login', req.session);
            helper.handleSuccess(res, { user_key: data.session_id });
          })
          .catch((err) => {
            logger.error(`@user.middleware @login @handleSession:: ${err}`);
            helper.handleError(res, 500);
          });
      }).catch((err) => {
        helper.handleError(res, 400);
      });
    }
  } else {
    helper.handleError(res, 400);
  }
};
/*
  to authenticate if user is logged in
*/
module.exports.isUserLoggedIn = (req, res, next) => {
  const s = req.session;
  if (s && s.username && s.super_admin) {
    next();
  } else {
    helper.handleError(res, 401);
  }
};
/*
  user logout
*/
module.exports.logout = (req, res) => {
  if (req.session) {
    req.session.session_id = undefined;
    req.session.username = undefined;
    req.session.client_domain = undefined;
    req.session.super_admin = undefined;
  }
  return res.redirect('/admin');
};