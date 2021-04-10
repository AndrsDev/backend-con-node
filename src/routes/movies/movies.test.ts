import { moviesMock, MoviesServiceMock } from 'utils/mocks/moviesMock';
import assert from 'assert';
import proxyquire from 'proxyquire';
import testServer from 'utils/common/testServer';

describe('routes - movies', function () {
  const route = proxyquire('routes/movies', {
    'services/movies': MoviesServiceMock,
  });

  const request = testServer(route.default);
  describe('GET /movies', function () {
    it('should respond with status 401', function (done) {
      request.get('/api/movies').expect(401, done);
    });

    //TODO: update the test with a valid bearer token
    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((_err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });

        done();
      });
    });
  });
});
