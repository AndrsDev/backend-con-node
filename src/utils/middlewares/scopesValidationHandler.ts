import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import { User } from 'models/user';

function scopesValidationHandler(allowedScopes: string[]) {
  return function (req: Request, _res: Response, next: NextFunction): void {
    const user: User = req.user as any;

    if (!user?.scopes) {
      next(boom.unauthorized());
      return;
    }

    const hasAccess = allowedScopes
      .map((scope) => user.scopes?.includes(scope))
      .includes(true);

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

export default scopesValidationHandler;
