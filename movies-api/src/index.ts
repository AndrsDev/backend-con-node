import { config } from 'config/index';
import moviesAPI from 'routes/moviesRoute';
import express  from 'express';

const app = express();

moviesAPI(app);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})