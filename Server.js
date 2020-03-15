const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

fs.writeFileSync(
  `${__dirname}/config/env.js`,
  `var REACT_APP_SERVER_URL = '${process.env.REACT_APP_SERVER_URL}';`
  + `var REACT_APP_googleClientId = '${process.env.REACT_APP_googleClientId}';`,
);

app.use(express.static(__dirname));
app.use(express.static(`${__dirname}/config`));

console.log(`server url: ${process.env.REACT_APP_SERVER_URL}`);
console.log(`REACT_APP_googleClientId: ${process.env.REACT_APP_googleClientId}`);

app.use(
  '/api',
  proxy({ target: process.env.REACT_APP_SERVER_URL, changeOrigin: true }),
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(port);
