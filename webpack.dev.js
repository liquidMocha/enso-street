const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
        'process.env.REACT_APP_SERVER_URL': JSON.stringify("https://enso-street-backend.herokuapp.com"),
        'process.env.REACT_APP_googleClientId': JSON.stringify("600326466228-h28741e5k0gksv3440nnn688rnl967bb.apps.googleusercontent.com")
    })
  ],
  module: {
    rules: [],
  },
});
