import { Db, MongoClient } from 'mongodb';
import { DATABASE } from '../../config/config';

export abstract class MongoDbClient {
  private static db: Db;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async getInstance(): Promise<Db> {
    if (this.db) return this.db;
    const client = new MongoClient(`mongodb://${DATABASE.HOST}:${DATABASE.PORT}/${DATABASE.NAME}`);
    try {
      await client.connect();
      this.db = client.db();
      return this.db;
    } catch (error) {
      console.error(error);
      throw new Error('Cannot connect to database => ' + DATABASE.NAME);
    }
  }
}
