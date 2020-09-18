import express, { Application } from 'express';

import routes from './routes/index';

const app: Application = express();

app.use('/', routes);
app.use('/applications', routes);

export default app;
