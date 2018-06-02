const encryption = require('../config/encryption');
const uuidv4 = require('uuid/v4');

/*
  to generate random string
*/
const generateString = (len) => {
  const available = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < len; i++) {
    str += available.charAt(Math.floor(Math.random() * available.length));
  }
  return str;
};

/*
  to generate client_key (client_id, client_domain)
*/
const generateKey = (a, d) => encryption.encrypt(`${generateString(4)}::${a}::${d}::${generateString(4)}`);
module.exports.generateKey = generateKey;

/*
  to create Client Object
*/
module.exports.createClientObject = (d, n) => {
  const x = uuidv4();
  return ({
    client_id: x,
    client_secret: `${generateString(3)}-${generateString(4)}-${generateString(3)}`,
    client_name: n,
    client_domain: d,
    client_key: generateKey(x, d),
    client_key_expiry: Date.now() + (2 * 24 * 3600000), // 1 day
    created_date: new Date(),
  });
};

/*
  to check for the expiry of client_key
*/
module.exports.isKeyStillActive = (d) => {
  if (Date.now() < d) {
    return true;
  }
  return false;
};

/*
  to decrypt the client access key
*/
module.exports.decryptKey = (k) => {
  if (k) {
    const d = encryption.decrypt(k);
    const s = d.split('::');
    if (s && s[1] && s[2]) {
      return { client_id: s[1], client_domain: s[2] };
    }
    return null;
  }
  return null;
};

module.exports.encryptPassword = p => encryption.encrypt(p);

module.exports.decryptPassword = p => encryption.decrypt(p);

module.exports.createClientObject = (b) => {
  console.log(b);
  return {
    name: b.name,
    username: b.username,
  };
};

module.exports.createAdminObject = (b) => {
  console.log(b);
  return {
    name: b.name,
    username: b.username,
  };
};