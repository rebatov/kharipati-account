const mongoHost = (process.env.MONGO_SERVICE_HOST || 'localhost');
const mongoPort = (process.env.MONGO_SERVICE_PORT || 27017);
const dbConfig = {
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/account',
    config: { autoIndex: false },
  },
  db: [{
    name: 'account',
    url: `mongodb://${mongoHost}:${mongoPort}/account`,
    schemaDir: `${global.xRootDir}/db/account/schema/`,
    options: {
      // db: {
      // },
      server: {
        poolSize: 5, // number
        ssl: false, // boolean
        sslValidate: true, // object
        checkServerIdentity: true, // boolean | function
        sslCA: null, // array
        sslCert: null, // Buffer | string
        sslKey: null, // Buffer | string
        sslPass: null, // Buffer | string
        socketOptions: { // Object
          autoReconnect: true, // boolean
          noDelay: true, // boolean
          keepAlive: 120, // number - TCP KeepAlive on the socket with a X ms delay before start
          connectTimeoutMS: 0, // number - TCP connection timeout settings
          socketTimeoutMS: 0, // number - TCP Socket timeout settings
        },
        reconnectTries: 30, // number
        reconnectInterval: 1000, // number
        monitoring: true, // boolean
        haInterval: 10000, // optional
      },
      // replset: {

      // },
      // user: null,
      // pass: null,
      // auth: '',
      // mongos: '',
      config: { autoIndex: true },
    },
  }],
};

module.exports = dbConfig;