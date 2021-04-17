import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

//Verifies if the API_KEY_TOKEN is present in the request as a query parameter
function apiKeyTokenValidationHandler() {
  return function (req: Request, _res: Response, next: NextFunction) {
    const { API_KEY_TOKEN } = req.query;
    if (!API_KEY_TOKEN) {
      next(
        boom.unauthorized(
          '[API_KEY_TOKEN] property is required as a query parameter'
        )
      );
      return;
    }
    next();
  };
}
export default apiKeyTokenValidationHandler;
