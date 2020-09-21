import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import applicationsRoutes from './routes/applications';

const app: Application = express();

app.use(bodyParser.json());
app.use(routes);
app.use(applicationsRoutes);

export default app;
