import MongoLib from 'libraries/mongoLib';
import bcrypt from 'bcrypt';
import { User } from 'models/user';

class UsersService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser(email: string): Promise<User> {
    const query = { email: { $eq: email } };
    const [user] = await this.mongoDB.getAll(this.collection, query);
    return user as User;
  }

  async createUser(user: User): Promise<string> {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const operation = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });
    return operation.insertedId;
  }

  async getOrCreateUser(user: User): Promise<User> {
    const foundUser = await this.getUser(user.email);
    if (foundUser) {
      return user;
    }

    await this.createUser(user);
    return await this.getUser(user.email);
  }
}

export default UsersService;
