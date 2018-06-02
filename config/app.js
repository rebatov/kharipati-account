// const logger = global.appObjectStore.logger;
const path = require('path');
const encryption = require('./encryption');
const lib = require('../lib/helper.lib');
const rootPath = path.normalize(`${__dirname}/../`);
const publicPath = `${rootPath}public`;
const distPath = `${rootPath}dist`;
const libPath = `${rootPath}lib`;


/* -- config -- */
const username = 'admin@kharipati';
const email = 'kharipati_dairy@gmail.com';
const password = 'admin1@3$5';

const superAdmin = {
  username,
  email,
  password: encryption.encrypt(password),
  created_date: new Date(),
  super_admin: true,
  user_group: [],
};

module.exports = {
  rootPath,
  publicPath,
  distPath,
  superAdmin,
};