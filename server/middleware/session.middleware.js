const logger = global.appObjectStore.logger;
const mongoose = require('mongoose');
const Session = require('../model/session');
const encryption = require('../../config').encryption;

/*
  Generate random string
*/
const generateString = (len) => {
  const available = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < len; i++) {
    str += available.charAt(Math.floor(Math.random() * available.length));
  }
  return str;
};

const returnKey = d => encryption.encrypt(`${generateString(6)}::${d.username}::${generateString(6)}`);
/*
  Create session Object
*/
const sessionObject = d => ({
  session_id: returnKey(d),
  username: d.username,
  role: 'admin',
  super_admin: d.super_admin,
  issued_date: new Date(),
  last_request: new Date(),
});
/*
  Get session from Database
*/
const getSession = d => new Promise((resolve, reject) => {
  Session
    .get({
      query: {
        username: d.username,
      },
    })
    .then((data) => {
      if (data && data.length === 1) {
        resolve(data[0]._id);
      } else {
        reject();
      }
    })
    .catch((e) => {
      logger.error(`@getSession :: ${e}`);
      reject();
    });
});
/*
  Post session in Database
*/
const createSession = d => new Promise((resolve, reject) => {
  console.log('Creating session', d);
  Session
    .post({
      data: sessionObject(d),
    })
    .then((data) => {
      if (!data) {
        reject({ error: 'Couldn\'t set session!!' });
      } else {
        resolve(data);
      }
    })
    .catch((e) => {
      logger.error(`@createSession :: ${e}`);
      reject(e);
    });
});
/*
  Update session in Database
*/
const updateSession = (id, d) => new Promise((resolve, reject) => {
  const k = returnKey(d);
  Session
    .put({
      query: {
        _id: new mongoose.Types.ObjectId(id),
      },
      data: {
        $set: {
          session_id: k,
          last_request: new Date(),
          super_admin: d.super_admin,
        },
      },
    })
    .then((data) => {
      if (data && data.nModified === 1) {
        resolve({
          session_id: k,
          username: d.username,
          super_admin: d.super_admin,
        });
      } else {
        reject({ error: 'Couldn\'t update session!!' });
      }
    })
    .catch((e) => {
      logger.error(`@updateSession :: ${e}`);
      reject(e);
    });
});
/*
  Handle session accordingly
*/
module.exports.handleSession = d => new Promise((resolve, reject) => {
  getSession(d)
    .then((id) => {
      updateSession(id, d)
        .then((rData) => {
          resolve(rData);
        })
        .catch((e) => {
          reject(e);
        });
    })
    .catch(() => {
      createSession(d)
        .then((rData) => {
          resolve(rData);
        })
        .catch((e) => {
          reject(e);
        });
    });
});
/*
  Delete session from DB
*/
module.exports.deleteSession = (id) => {
  Session
    .delete({
      query: {
        session_id: id,
      },
    })
    .then((d) => {
      logger.info('@deleteSession :: {d}');
    })
    .catch((e) => {
      logger.error(`@deleteSession :: ${JSON.parse(e, null, 2)}`);
    });
};
/*
  decrypt Session Key
*/
module.exports.decryptSession = (key) => {
  if (key) {
    const str = encryption.decrypt(key);
    const arr = str.split('::');
    if (arr && arr[1]) {
      return ({
        username: arr[1],
      });
    }
    return null;
  }
  return null;
};
/*
  Find Session by key
*/
module.exports.findInSession = key => new Promise((resolve, reject) => {
  console.log('At session', key);
  Session
    .get({
      query: {
        session_id: key,
        // super_admin: false,
      },
    })
    .then((d) => {
      console.log('D', d);
      if (d && d.length === 1) {
        const o = module.exports.decryptSession(key);
        console.log('O', o);
        if (o) {
          resolve(o);
        } else {
          reject({ error: 'Un-authorized key was sent!!' });
        }
      } else {
        reject({ error: 'Un-authorized key was sent!!' });
      }
    })
    .catch((e) => {
      reject(e);
    });
});