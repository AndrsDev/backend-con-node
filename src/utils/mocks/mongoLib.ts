import { Movie } from 'models/movie';
import { FilterQuery, InsertOneWriteOpResult } from 'mongodb';
import sinon from 'sinon';
import { moviesMock, filteredMoviesMock } from 'utils/mocks/moviesMock';

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  /*
    Needed for proxiquire to work properly.
    https://github.com/thlorenz/proxyquire#preventing-call-thru-to-original-dependency
  */
  static '@noCallThru' = true;

  async getAll(
    collection: string,
    query?: FilterQuery<Movie[]>
  ): Promise<Movie[]> {
    return getAllStub(collection, query);
  }

  async create(
    collection: string,
    data: Movie
  ): Promise<InsertOneWriteOpResult<any>> {
    return createStub(collection, data);
  }
}

export { getAllStub, createStub };
export default MongoLibMock;
