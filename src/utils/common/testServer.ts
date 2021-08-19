/* 
  Useful post
  https://medium.com/swlh/how-to-setting-up-unit-tests-with-typescript-871c0f4f1609
*/

import express, { Express } from 'express';
import supertest from 'supertest';

function testServer(route: (app: Express) => void) {
  const app = express();
  route(app);
  return supertest(app);
}

export default testServer;
