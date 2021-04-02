// DEBUG=app:* node scripts/mongo/seedApiKeys.js

import { green, red } from 'chalk';
import { randomBytes } from 'crypto';
import MongoLib from 'libraries/mongoLib';
import debug from 'debug';
const log = debug('app:scripts:users');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'create:movies',
  'update:movies',
  'delete:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies',
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies',
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

function generateRandomToken() {
  const buffer = randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async (apiKey) => {
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    log(green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    log(red(error));
    process.exit(1);
  }
}

seedApiKeys();
