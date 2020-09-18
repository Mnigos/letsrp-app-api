import express, { Application } from 'express';

const routes = require('./routes/index');

const app: Application = express();

app.use('/', routes);
app.use('/applications', routes);

module.exports = app;
