import assert from 'assert';
import proxyquire from 'proxyquire';
import MongoLibMock, { getAllStub } from 'utils/mocks/mongoLib';
import { moviesMock } from 'utils/mocks/moviesMock';

describe('services - movies', function () {
  const MoviesService = proxyquire('services/moviesService', {
    'libraries/mongoLib': MongoLibMock,
  });

  const moviesService = new MoviesService.default();

  describe('when getMovies method is called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function () {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result, expected);
    });
  });
});
