import { NextFunction } from 'express';
import ApiKeysService from 'services/apiKeysService';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { config } from 'config';

// Generate a JWT with the user data and access scopes
async function generateAuthJWT(
  apiKeyToken: string,
  user: any,
  next: NextFunction
) {
  const apiKeysService = new ApiKeysService();

  const apiKey = await apiKeysService.getApiKey(apiKeyToken);
  if (!apiKey) {
    next(boom.unauthorized());
    return;
  }

  const { _id: id, name, email } = user;
  const payload = {
    sub: id,
    name,
    email,
    scopes: apiKey.scopes,
  };

  return jwt.sign(payload, config.AUTH_JWT_SECRET, {
    expiresIn: '15m',
  });
}

export default generateAuthJWT;
