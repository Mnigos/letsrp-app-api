import mongoose from 'mongoose';
import assert from 'assert';
import app from './app';
import './config/keysDev';

const port = 8080;

['mongoURI'].forEach(variable => {
  assert(process.env[variable], `process.env.${variable} is undefined`);
});

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongoose is connected');
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  });
