import express, { Application } from 'express';

import path from 'path';

const routes = require('./routes/index');

const app: Application = express();

app.use('/', routes);
app.use('/applications', routes);

module.exports = app;
