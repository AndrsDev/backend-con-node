import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  CORS: process.env.CORS || '*',
  DB_USER: process.env.DB_USER || 'DB_USER',
  DB_PASSWORD: process.env.DB_PASSWORD || 'DB_PASSWORD',
  DB_HOST: process.env.DB_HOST || 'DB_HOST',
  DB_NAME: process.env.DB_NAME || 'DB_NAME',
  DEFAULT_ADMIN_PASSWORD:
    process.env.DEFAULT_ADMIN_PASSWORD || 'DEFAULT_ADMIN_PASSWORD',
  DEFAULT_USER_PASSWORD:
    process.env.DEFAULT_USER_PASSWORD || 'DEFAULT_USER_PASSWORD',
  AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET || 'AUTH_JWT_SECRET',
  PUBLIC_API_KEY_TOKEN:
    process.env.PUBLIC_API_KEY_TOKEN || 'PUBLIC_API_KEY_TOKEN',
  ADMIN_API_KEY_TOKEN: process.env.ADMIN_API_KEY_TOKEN || 'ADMIN_API_KEY_TOKEN',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
};

export { config };
