import express, { Express } from 'express';
import { MoviesService } from 'services/moviesService';
import {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} from 'utils/schemas/movieScheme';

import validationHandler from 'utils/middlewares/validationHandler';

function moviesAPI(app: Express): void {
  const router = express.Router();
  const moviesService = new MoviesService();
  app.use('/api/movies', router);

  router.get('/', async function (_, res, next) {
    try {
      const movies = await moviesService.getMovies({});
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { id } = req.params;
      try {
        const movie = await moviesService.getMovie(id);
        res.status(200).json({
          data: movie,
          message: 'movie retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema, 'body'),
    async function (req, res, next) {
      const { body } = req;
      try {
        const createdMovieId = await moviesService.createMovie(body);
        res.status(201).json({
          data: { id: createdMovieId },
          message: 'movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema, 'body'),
    async function (req, res, next) {
      const { id } = req.params;
      const { body } = req;
      try {
        const updatedMovieId = await moviesService.updateMovie(id, body);
        res.status(200).json({
          data: { id: updatedMovieId },
          message: 'movie updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id',
    validationHandler({ id: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { id } = req.params;
      try {
        const deletedMovieId = await moviesService.deleteMovie(id);
        res.status(200).json({
          data: { id: deletedMovieId },
          message: 'movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

export default moviesAPI;
