const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');

module.exports = merge(devConfig, {
    devServer: {
        https: false
    }
});