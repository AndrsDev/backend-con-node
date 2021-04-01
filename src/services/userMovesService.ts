import MongoLib from 'libraries/mongoLib';
import { UserMovie } from 'models/userMovie';

class UserMoviesService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  async getUserMovies(userId: string): Promise<UserMovie[]> {
    const query = { userId: { $eq: userId } };
    const userMovies = await this.mongoDB.getAll(this.collection, query);
    return userMovies || [];
  }

  async createUserMovie(data: UserMovie): Promise<string> {
    const operation = await this.mongoDB.create(this.collection, data);
    return operation.insertedId;
  }

  async deleteUserMovie(documentId: string): Promise<string> {
    await this.mongoDB.delete(this.collection, documentId);
    return documentId;
  }
}

export default UserMoviesService;
