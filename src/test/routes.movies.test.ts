import { moviesMock, MoviesServiceMock } from 'utils/mocks/moviesMock';
import assert from 'assert';
import proxyquire from 'proxyquire';
import testServer from 'utils/testServer';

describe('routes - movies', function () {
  const route = proxyquire('routes/moviesRoute', {
    'services/moviesService': MoviesServiceMock,
  });

  const request = testServer(route);
  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    });

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
