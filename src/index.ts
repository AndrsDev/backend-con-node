import { config } from 'config';
import moviesAPI from 'routes/moviesRoute';
import express from 'express';
import cors from 'cors';
import { errorHandler, errorWrapper } from 'utils/middlewares/errorHandlers';
import notFoundHandler from 'utils/middlewares/notFoundHandler';

const app = express();
app.use(cors());

//Body Parser
app.use(express.json());

//Routes
moviesAPI(app);

//Error middlewares
app.use(notFoundHandler); //Catch 404
app.use(errorWrapper);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
