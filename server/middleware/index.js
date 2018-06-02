const config = require('../../config').app;
const Admin = require('../model/admin');

const logger = global.appObjectStore.logger;

function dumpSuperUser() {
  Admin
    .get({
      query: {
        username: config.superAdmin.username,
      },
    })
    .then((d) => {
      if (d && d.length === 1) {
        logger.info('Super Admin @lready exist!');
      } else {
        Admin.post({
            data: config.superAdmin,
          })
          .then(() => {
            logger.info('Super Admin created!');
          })
          .catch((e) => {
            logger.error(`@dumpSuperAdmin @admin :: ${e}`);
          });
      }
    })
    .catch((e) => {
      logger.error(`@dumpSuperAdmin @get :: ${e}`);
    });
}
dumpSuperUser();