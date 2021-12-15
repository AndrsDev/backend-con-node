import express, { Express } from 'express';
import passport from 'passport';
import { config } from 'config';
import GoogleStrategy from 'utils/auth/strategies/oauth';
import { User } from 'models/user';
import generateAuthJWT from 'utils/common/generateAuthJWT';
import boom from '@hapi/boom';

/**
 * @Note Usually this endpoint would be in a different
 * client server. In order to not expose the API_KEY_TOKEN
 * in the client aplication.
 */

function clientRoute(app: Express) {
  const router = express.Router();
  app.use('/api/client', router);

  router.get(
    '/google',
    passport.authenticate(GoogleStrategy, {
      scope: ['openid', 'profile', 'email'],
    })
  );

  router.get(
    '/google/callback',
    passport.authenticate(GoogleStrategy, {
      session: false,
    }),
    async function (req, res, next) {
      if (!req.user) {
        next(boom.unauthorized());
      }

      const user: User = req.user as any;
      const token = await generateAuthJWT(user.apiKeyToken ?? '', user);

      if (!token) {
        next(boom.unauthorized());
        return;
      }

      //Return the JWT and set the cookie
      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev,
        sameSite: 'none',
      });
      return res.status(200).json({ token });
    }
  );
}

export default clientRoute;
