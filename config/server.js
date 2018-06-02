module.exports = {
  development: {
    port: process.env.PORT || 7070,
    ip: process.env.IP || '0.0.0.0',
  },
  production: {
    port: process.env.PORT || 80,
    ip: '',
  },
};