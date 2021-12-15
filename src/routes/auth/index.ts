import express, { Express } from 'express';
import passport from 'passport';
import { config } from 'config';
import basicStrategy from 'utils/auth/strategies/basic';
import validationHandler from 'utils/middlewares/validationHandler';
import { createUserSchema } from 'utils/schemas/userSchema';
import UsersService from 'services/users';
import { User } from 'models/user';
import {
  THIRTY_DAYS_IN_MILLISECONDS,
  TWO_HOURS_IN_MILLISECONDS,
} from 'utils/common/time';
import apiKeyTokenValidationHandler from 'utils/middlewares/apiKeyTokenValidationHandler';
import generateAuthJWT from 'utils/common/generateAuthJWT';
import boom from '@hapi/boom';

function authRoute(app: Express) {
  const router = express.Router();
  const usersService = new UsersService();
  app.use('/api/auth', router);

  router.post(
    '/register',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const body: User = req.body;

      try {
        // Verify if the user already exists
        const user = await usersService.getUser(body.email);
        if (user) {
          res.status(400).json({
            message: 'user already exists',
          });
          return;
        }

        // Create the user and return the response
        const createdUserId = await usersService.createUser(body);
        res.status(201).json({
          data: { id: createdUserId },
          message: 'user created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/login',
    apiKeyTokenValidationHandler(),
    passport.authenticate(basicStrategy, { session: false }),
    async function (req, res, next) {
      const { rememberMe } = req.body;
      const { API_KEY_TOKEN } = req.query;

      const token = await generateAuthJWT(API_KEY_TOKEN as string, req.user);

      if (!token) {
        next(boom.unauthorized());
        return;
      }

      //Return the JWT and set the cookie
      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev,
        sameSite: 'none',
        maxAge: rememberMe
          ? THIRTY_DAYS_IN_MILLISECONDS
          : TWO_HOURS_IN_MILLISECONDS,
      });
      return res.status(200).json({ token });
    }
  );
}

export default authRoute;
