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
      STRIPE_EXPRESS_BASE_URL: JSON.stringify('https://connect.stripe.com/express/oauth/authorize'),
      STRIPE_CLIENT_ID: JSON.stringify('stripe_client_id'),
      STRIPE_REDIRECT_URI: JSON.stringify('https://enso-street.herokuapp.com/'),
    }),
  ],
});
