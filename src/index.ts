import { config } from 'config';
import express from 'express';
import cors from 'cors';
import { errorHandler, errorWrapper } from 'utils/middlewares/errorHandlers';
import notFoundHandler from 'utils/middlewares/notFoundHandler';
import userMoviesRoute from 'routes/user-movies';
import authRoute from 'routes/auth';
import moviesRoute from 'routes/movies';

const app = express();
app.use(cors());

//Body Parser
app.use(express.json());

//Routes
moviesRoute(app);
userMoviesRoute(app);
authRoute(app);

//Error middlewares
app.use(notFoundHandler); //Catch 404
app.use(errorWrapper);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
