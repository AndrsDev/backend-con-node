import express, { Express } from 'express';
import passport from 'passport';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { config } from 'config';
import ApiKeysService from 'services/apiKeysService';
import basicStrategy from 'utils/auth/strategies/basic';

function authRoute(app: Express) {
  const router = express.Router();
  const apiKeysService = new ApiKeysService();
  app.use('/api/auth', router);

  router.post(
    '/login',
    passport.authenticate(basicStrategy, { session: false }),
    async function (req, res, next) {
      const { API_KEY_TOKEN } = req.query;

      //Verify if the API_KEY_TOKEN is present
      if (!API_KEY_TOKEN) {
        next(
          boom.unauthorized(
            '[API_KEY_TOKEN] property is required in request body.'
          )
        );
        return;
      }

      const apiKey = await apiKeysService.getApiKey(API_KEY_TOKEN as string);

      if (!apiKey) {
        next(boom.unauthorized());
        return;
      }

      // Generate a JWT with the user data and access scopes (Note that the req.user is provided by the passsport.authenticate() middleware)
      const { _id: id, name, email } = req.user as any;
      const payload = {
        sub: id,
        name,
        email,
        scopes: apiKey.scopes,
      };
      const token = jwt.sign(payload, config.AUTH_JWT_SECRET, {
        expiresIn: '15m',
      });

      //Return the JWT
      return res.status(200).json({ token });
    }
  );
}

export default authRoute;
