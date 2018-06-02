/**
 * Created by dbasukala on 7/10/2017.
 */
const webpack = require('webpack');
const { resolve } = require('path');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: [
    './public/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public', 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      { // js loading
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      },
      { // styles loader
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { // styles loading
        test: /\.scss$/,
        loader: 'style-loader?sourceMap!css-loader?sourceMap!sass-loader?sourceMap'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  externals: [
    'canvas',
    'fs',
    'xmldom'
  ],
  plugins: [

    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    // using production environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      beautify: false,
      sourceMap: true,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
      }
    })
    // new BundleAnalyzerPlugin()
  ]
};

