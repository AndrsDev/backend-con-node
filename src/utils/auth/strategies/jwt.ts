import { Strategy, ExtractJwt } from 'passport-jwt';
import boom from '@hapi/boom';
import UsersService from 'services/usersService';
import { config } from 'config';

const jwtStrategy = new Strategy(
  {
    secretOrKey: config.AUTH_JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
