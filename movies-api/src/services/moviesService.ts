import { Movie } from 'models/movie';
import moviesMock from 'utils/mocks/moviesMock';

class MoviesService {
  async getMovies(): Promise<Movie[]> {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie(id: number): Promise<Movie>  {
    const movie = await Promise.resolve(moviesMock[id]);
    return movie || {};
  }

  async createMovie(data: any): Promise<string> {
    const createdMovieId = await Promise.resolve(moviesMock[0].id);
    console.log(data);
    return createdMovieId;
  }

  async updateMovie(id: number, data: any): Promise<string> {
    const updatedMovieId = await Promise.resolve(moviesMock[id].id);
    console.log(data)
    return updatedMovieId;
  }

  async deleteMovie(id: number): Promise<string> {
    const deletedMovieId = await Promise.resolve(moviesMock[id].id);
    return deletedMovieId;
  }
}

export {
  MoviesService
}