import express, { Express } from 'express';
import UserMoviesService from 'services/userMovesService';
import validationHandler from 'utils/middlewares/validationHandler';
import { userIdSchema } from 'utils/schemas/userSchema';

import {
  createUserMovieSchema,
  userMovieIdSchema,
} from 'utils/schemas/userMoviesSchema';
import passport from 'passport';
import jwtStrategy from 'utils/auth/strategies/jwt';

function userMoviesRoute(app: Express) {
  const router = express.Router();
  const userMoviesService = new UserMoviesService();
  app.use('/api/user-movies', router);

  router.get(
    '/',
    passport.authenticate(jwtStrategy, { session: false }),
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;
      try {
        const userMovies = await userMoviesService.getUserMovies(
          userId as string
        );
        res.status(200).json({
          data: userMovies,
          message: 'user movies listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate(jwtStrategy, { session: false }),
    validationHandler(createUserMovieSchema),
    async function (req, res, next) {
      const { body } = req;

      try {
        const createdUserMovieId = await userMoviesService.createUserMovie(
          body
        );
        res.status(201).json({
          data: { id: createdUserMovieId },
          message: 'user movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    passport.authenticate(jwtStrategy, { session: false }),
    validationHandler({ userMovieId: userMovieIdSchema }, 'params'),
    async function (req, res, next) {
      const { userMovieId } = req.params;

      try {
        const deletedUserMoveId = await userMoviesService.deleteUserMovie(
          userMovieId
        );
        res.send(200).json({
          data: { id: deletedUserMoveId },
          message: 'user movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

export default userMoviesRoute;
