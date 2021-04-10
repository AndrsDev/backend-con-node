/* eslint-disable @typescript-eslint/no-unused-vars */

/* 
  Error middlewares documentation:
  https://expressjs.com/en/guide/error-handling.html
*/

import boom from '@hapi/boom';
import { config } from 'config';
import { NextFunction, Request, Response } from 'express';

function buildError({ output, stack }: any): Record<string, unknown> {
  if (config.dev) {
    return {
      ...output.payload,
      stack,
    };
  }
  return { error: output.payload };
}

function errorWrapper(
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    next(err);
    return;
  }
  next(boom.badImplementation(err));
}

function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.status(err.output.statusCode);
  res.json(buildError(err));
}

export { errorWrapper, errorHandler };
