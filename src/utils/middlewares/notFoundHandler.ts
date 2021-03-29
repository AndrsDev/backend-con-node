import { Request, Response } from 'express';
import boom from '@hapi/boom';

function notFoundHandler(_req: Request, res: Response): void {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

export default notFoundHandler;
