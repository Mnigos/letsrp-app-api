import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import loginAuth from './auth';

const app: Application = express();

app.use(bodyParser.json());

app.use(routes);
app.use(loginAuth);

export default app;
