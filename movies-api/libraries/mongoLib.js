const { MongoClient } = require('mongodb');
const { config } = require('../config/index.js')

const USER = encodeURIComponent(config.DB_USER);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD);
const DB_HOST = encodeURIComponent(config.DB_HOST);
const DB_NAME = encodeURIComponent(config.DB_NAME);

const uri = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    this.dbName = DB_NAME;
  }

  connect() {
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
}

module.exports = MongoLib