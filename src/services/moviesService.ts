import { Movie } from 'models/movie';
import MongoLib from 'libraries/mongoLib';

class MoviesService {
  private collection: string;
  private mongoDB: MongoLib;


  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }: any): Promise<Movie[]> {
    const query = tags && { tags: { $in: tags }}
    const movies = await this.mongoDB.getAll(this.collection, query)
    return movies || [];
  }

  async getMovie(id: string): Promise<Movie>  {
    const movie = await this.mongoDB.get(this.collection, id)
    return movie;
  }

  async createMovie(data: Movie): Promise<string> {
    const operation = await this.mongoDB.create(this.collection, data);
    return operation.insertedId;
  }

  async updateMovie(id: string, data: Movie): Promise<string> {
    await this.mongoDB.update(this.collection, id, data);
    return id;
  }

  async deleteMovie(id: string): Promise<string> {
    await this.mongoDB.delete(this.collection, id);
    return id
  }
}

export {
  MoviesService
}