/* 
  Useful post
  https://medium.com/swlh/how-to-setting-up-unit-tests-with-typescript-871c0f4f1609
*/

import express from 'express';
import supertest from 'supertest';

function testServer(route: any) {
  const app = express();
  route.default(app);
  return supertest(app);
}

export default testServer;
