

const session = require('express-session');

module.exports = (app) => {
  app.use(session({
    secret: '$E$$I0Nm@r8@!u0t$',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 12 * 60 * 60 * 1000,
    //   sameSite: true,
    //   secure: app.get('env') === 'production',
    // },
  }));
};
