const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');


const allowCrossDomain = (req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, referrer, user, Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    // res.header('Access-Control-Allow-Headers', 'Authorization, referrer, user, Origin, X-Requested-With, Content-Type, Accept');
    res.status(200).end();
  } else {
    next();
  }
};

function expressConfig(app, config) {

  app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

  app.use(bodyParser.json({ limit: '1mb' }));

  app.set('views', `${config.publicPath}`);

  app.engine('html', ejs.renderFile);

  app.set('view engine', 'html');

  const env = app.get('env');

  app.use(allowCrossDomain);

  if (env === 'production') {
    app.use(express.static(`${config.distPath}`));
    app.get('/*', (req, res) => {
      res.sendFile(`${config.publicPath}/index.html`);
    });
  } else if (env === 'development' || env === 'test') {
    app.use(express.static(`${config.publicPath}`));

    const webpack = require('webpack');
    const webpack_cfg = require(`${config.publicPath}/../webpack.config.js`);
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    // console.log("webpack configuration", webpack_cfg);
    const compiler = webpack(webpack_cfg);

    // attach dev middleware to hte compiler and the server
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpack_cfg.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    });

    app.use(middleware);
    // Attach the hot middleware to the compiler & the server
    app.use(webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 2000,
    }));

    app.get('/', (req, res) => {
      const memoryFs = compiler.outputFileSystem;
      // var index = path.join("/public/index.html");
      // var html = memoryFs.readFileSync("/public/index.html");
      res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, user, referrer');
      // next();
      res.sendFile(`${config.publicPath}/index.html`);
      // res.end(html)
    });
  }
}

module.exports = expressConfig;