//const indexApi = require('../api/index');

const express = require('express');
const app = express();

app.use(require('./puertos'));
app.use(require('./users'));

module.exports = app;