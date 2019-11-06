const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname));
app.use(function (req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});

app.disable('etag');

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);