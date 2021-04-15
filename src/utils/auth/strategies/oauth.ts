import { config } from 'config';
import { OAuth2Strategy } from 'passport-google-oauth';

const GoogleStrategy = new OAuth2Strategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  },
  function (_accessToken, _refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    return done(null, profile);
  }
);

export default GoogleStrategy;
