import { Strategy } from 'passport-jwt';
import boom from '@hapi/boom';
import UsersService from 'services/users';
import { config } from 'config';
import { Request } from 'express';

function cookieExtractor(req: Request) {
  let token = null;
  if (req?.cookies) token = req.cookies['token'];
  return token;
}

const jwtStrategy = new Strategy(
  {
    secretOrKey: config.AUTH_JWT_SECRET,
    jwtFromRequest: cookieExtractor,
  },
  async function (payload, callback) {
    const usersService = new UsersService();

    try {
      const user = await usersService.getUser(payload.email);

      if (!user) {
        return callback(boom.unauthorized(), null);
      }

      delete user.password;

      callback(null, { ...user, scopes: payload.scopes });
    } catch (error) {
      callback(error);
    }
  }
);

export default jwtStrategy;
