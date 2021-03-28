import { Db, FilterQuery, MongoClient, ObjectId } from 'mongodb';
import { config } from 'config';
import { Movie } from 'models/movie';

const USER = encodeURIComponent(config.DB_USER!);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD!);
const DB_HOST = encodeURIComponent(config.DB_HOST!);
const DB_NAME = encodeURIComponent(config.DB_NAME!);

const uri = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  static connection: Promise<Db>;
  private client: MongoClient;
  private dbName: string;

  constructor() {
    this.client = new MongoClient(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    this.dbName = DB_NAME;
  }

  connect() : Promise<Db> {
    if(!MongoLib.connection){
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if(err){
            reject(err)
          }
          resolve(this.client.db(this.dbName))
        });
      })
    }
    return MongoLib.connection;
  }

  async getAll(collection: string, query?: FilterQuery<any>): Promise<Movie[]> {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async get(collection: string, id: string): Promise<Movie> {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: new ObjectId(id) })
  }

  async create(collection: string, data: Movie) {
    const db = await this.connect();
    return db.collection(collection).insertOne(data);
  }

  async update(collection: string, id: string, data: Movie) {
    const db = await this.connect();
    return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });
  }

  async delete(collection: string, id: string) {
    const db = await this.connect();
    return db.collection(collection).deleteOne({ _id: new ObjectId(id) });
  }
}

export default MongoLib