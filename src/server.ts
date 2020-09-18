import app from './app';

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
