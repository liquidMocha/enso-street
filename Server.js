const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname));
console.log(`server url: ${process.env.REACT_APP_SERVER_URL}`);
app.use(
  '/api',
  proxy({ target: process.env.REACT_APP_SERVER_URL, changeOrigin: true }),
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(port);
