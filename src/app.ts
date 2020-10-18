import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import loginAuth from './auth';

import applicationRoute from './routes/applications/index';
import applicationWlRoute from './routes/applications/wl';
import applicationSupRoute from './routes/applications/sup';
import applicationFirmRoute from './routes/applications/firm';
import applicationEMSRoute from './routes/applications/ems';
import applicationLSCMRoute from './routes/applications/lscm';
import applicationLSPDRoute from './routes/applications/lspd';
import applicationOrgRoute from './routes/applications/org';

import adminWlRoute from './routes/admin/wl';
import adminSupRoute from './routes/admin/sup';

const app: Application = express();

app.use(bodyParser.json());
app.use(routes);
app.use(loginAuth);

app.use('/applications', applicationRoute);
app.use('/applications', applicationWlRoute);
app.use('/applications', applicationSupRoute);
app.use('/applications', applicationFirmRoute);
app.use('/applications', applicationEMSRoute);
app.use('/applications', applicationLSCMRoute);
app.use('/applications', applicationLSPDRoute);
app.use('/applications', applicationOrgRoute);

app.use('/admin', adminWlRoute);
app.use('/admin', adminSupRoute);

export default app;
