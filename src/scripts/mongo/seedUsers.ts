// DEBUG=app:* node scripts/mongo/seedUsers.js

import { hash } from 'bcrypt';
import { green, red } from 'chalk';
import MongoLib from 'libraries/mongoLib';
import { config } from 'config';
import { User } from 'models/user';
import debug from 'debug';
const log = debug('app:scripts:users');

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.DEFAULT_ADMIN_PASSWORD,
    isAdmin: true,
  },
  {
    email: 'jose@undefined.sh',
    name: 'Jose Maria',
    password: config.DEFAULT_USER_PASSWORD,
  },
  {
    email: 'maria@undefined.sh',
    name: 'Maria Jose',
    password: config.DEFAULT_USER_PASSWORD,
  },
];

async function createUser(mongoDB: MongoLib, user: User) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async (user) => {
      const userId = await createUser(mongoDB, user);
      log(green('User created with id:', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    log(red(error));
    process.exit(1);
  }
}

seedUsers();
