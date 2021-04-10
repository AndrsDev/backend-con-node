import { config } from 'config';
import { Response } from 'express';

function cacheResponse(res: Response, seconds: number) {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

export default cacheResponse;
