import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import applicationRoute from './routes/applications/index';
import applicationWlRoute from './routes/applications/wl';

const app: Application = express();

app.use(bodyParser.json());
app.use(routes);
app.use('/applications', applicationRoute);
app.use('/applications', applicationWlRoute);

export default app;
