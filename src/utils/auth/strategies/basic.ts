import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import UsersService from 'services/users';
import { User } from 'models/user';

const basicStrategy = new BasicStrategy(async function (
  email: string,
  password: string,
  callback: (error: any, user: User | null) => void
) {
  const usersService = new UsersService();

  try {
    const user = await await usersService.getUser(email);
    if (!user) {
      return callback(boom.unauthorized(), null);
    }

    if (!(await bcrypt.compare(password, user.password ?? ''))) {
      return callback(boom.unauthorized(), null);
    }

    delete user.password;

    return callback(null, user);
  } catch (error) {
    callback(error, null);
  }
});

export default basicStrategy;
