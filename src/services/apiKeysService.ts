import MongoLib from 'libraries/mongoLib';
import { ApiKey } from 'models/apiKey';

class ApiKeysService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  async getApiKey(token: string): Promise<ApiKey> {
    const query = { token: { $eq: token } };
    const [apiKey] = await this.mongoDB.getAll(this.collection, query);
    return apiKey;
  }
}

export default ApiKeysService;
