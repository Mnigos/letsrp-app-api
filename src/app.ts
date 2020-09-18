import express, { Application } from 'express';

import path from 'path';

const routes = require('./routes/index');

const app: Application = express();

app.use('/', routes);

module.exports = app;
