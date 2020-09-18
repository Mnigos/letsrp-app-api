import express from 'express';
import path from 'path';
const routes = require('./routes/index');

const main = express();

main.use('/', routes);

module.exports = main;
