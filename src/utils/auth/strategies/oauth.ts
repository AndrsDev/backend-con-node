import { config } from 'config';
import { OAuth2Strategy } from 'passport-google-oauth';
import { User } from 'models/user';
import UsersService from 'services/users';

const GoogleStrategy = new OAuth2Strategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/client/google/callback',
  },
  async function (_accessToken, _refreshToken, profile, done) {
    const usersService = new UsersService();
    const { name, email } = profile._json;
    const data: User = {
      name,
      email,
    };

    const user = await usersService.getOrCreateUser(data);
    return done(null, {
      ...user,
      apiKeyToken: config.PUBLIC_API_KEY_TOKEN,
    });
  }
);

export default GoogleStrategy;
