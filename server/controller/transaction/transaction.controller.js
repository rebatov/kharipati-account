const logger = global.appObjectStore.logger;
const Admin = require('../../model/admin');
const lib = require('../../../lib/helper.lib');

/*
to register a client
*/
module.exports.register = (req, res) => {
  const b = req.body;
  if (b && b.name && b.username) {
    Admin.post({
      data: lib.createAdminObject(b),
    }).then((client) => {
      if (!client) {
        res.status(500).send({
          status: 'error',
          message: 'Cannot create client',
        });
      } else {
        res.status(200).send({
          status: 'success',
          message: 'Successfully created a client',
          data: client,
        });
      }
    }).catch((err) => {
      const errJson = err.toJSON();
      res.status(500).send({
        status: 'error',
        message: errJson.errmsg,
      });
    });
  }
};

/*
  to get all registered clients
*/
module.exports.getAll = (req, res) => {
  Admin
    .get({ query: {} })
    .then((op) => {
      if (op.length > 0) {
        res.status(200).send({
          status: 'success',
          message: 'Successfully got all clients',
          data: op,
        });
      } else {
        res.status(404).send({
          status: 'error',
          message: 'Found no clients',
        });
      }
    })
    .catch((err) => {
      logger.error(`@getAllRegisteredDomains :: ${err}`);
      res.status(404).send({
        status: 'error',
        message: 'Found no clients',
      });
    });
};

/*
  to delete client by ID
*/
module.exports.delete = (req, res) => {
  if (req.params && req.params.username) {
    Admin
      .delete({ query: { username: req.params.username } })
      .then((d) => {
        if (d && d.result && d.result.n === 1) {
          logger.info(`@client.controller @deleteClient :: Success :: ${d}`);
          res.status(200).send({
            status: 'success',
            message: 'Successfully deleted a client',
            data: d,
          });
        } else {
          res.status(500).send({
            status: 'error',
            message: 'Admin Doesnot Exist',
          });
        }
      })
      .catch((e) => {
        logger.error(`@client.controller @deleteClient :: ${e}`);
        const errJson = e.toJSON();
        res.status(500).send({
          status: 'error',
          message: errJson.errmsg,
        });
      });
  } else {
    res.status(400).send({
      status: 'error',
      message: 'Request invalid',
    });
  }
};