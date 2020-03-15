const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: 3000,
    https: true,
    proxy: {
      '/api/**':
                {
                  target: 'https://localhost:8080',
                  secure: false,
                },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      REACT_APP_SERVER_URL: JSON.stringify('https://localhost:8080'),
      REACT_APP_googleClientId: JSON.stringify('google-client-id'),
    }),
  ],
});
