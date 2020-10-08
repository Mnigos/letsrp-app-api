import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import applicationRoute from './routes/applications/index';
import applicationWlRoute from './routes/applications/wl';
import applicationSupRoute from './routes/applications/sup';
import applicationFirmRoute from './routes/applications/firm';
import applicationEMSRoute from './routes/applications/ems';
import applicationLSCMRoute from './routes/applications/lscm';

const app: Application = express();

app.use(bodyParser.json());
app.use(routes);

app.use('/applications', applicationRoute);
app.use('/applications', applicationWlRoute);
app.use('/applications', applicationSupRoute);
app.use('/applications', applicationFirmRoute);
app.use('/applications', applicationEMSRoute);
app.use('/applications', applicationLSCMRoute);

export default app;
