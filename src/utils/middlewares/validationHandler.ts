import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import joi from '@hapi/joi';

function validate(data: any, schema: any) {
  const { error } = joi.object(schema).validate(data);
  return error;
}

function validationHandler(schema: any, check = 'body' as 'body' | 'params') {
  return function (req: Request, _res: Response, next: NextFunction): void {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error.message)) : next();
  };
}

export default validationHandler;
