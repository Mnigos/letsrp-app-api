const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const main = express();

main.set('views', path.join(__dirname, 'views'));

main.use('/', routes);

module.exports = main;
