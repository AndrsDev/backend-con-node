import { config } from 'config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler, errorWrapper } from 'utils/middlewares/errorHandlers';
import notFoundHandler from 'utils/middlewares/notFoundHandler';
import userMoviesRoute from 'routes/user-movies';
import authRoute from 'routes/auth';
import moviesRoute from 'routes/movies';
import clientRoute from 'routes/client';

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
//Parsers
app.use(express.json());
app.use(cookieParser());

//Routes
moviesRoute(app);
userMoviesRoute(app);
authRoute(app);
clientRoute(app);

//Error middlewares
app.use(notFoundHandler); //Catch 404
app.use(errorWrapper);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
