const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:9999/__webpack_hmr',
    './public/js/index.js',
  ],
  output: {
    path: `${__dirname}dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
  },
  module: {
    rules: [{ // js loader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
      { // styles loader
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  externals: [
    'fs',
    'xmldom',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};