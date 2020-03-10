const merge = require('webpack-merge');
const devConfig = require('./webpack.local.js');

module.exports = merge(devConfig, {
  devServer: {
    https: false,
  },
});
