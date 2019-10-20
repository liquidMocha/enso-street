const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_SERVER_URL': JSON.stringify('https://localhost:8080')
        })
    ]
});