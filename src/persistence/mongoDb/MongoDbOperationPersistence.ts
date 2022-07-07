import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';
import { IOperationPersistence } from '../../core/operation/IOperationPersistence';
import { Operation } from '../../core/operation/Operation';

export class MongoDbOperationPersistence implements IOperationPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('operations')))
      .catch((err) => console.error(err));
  }

  async create(data: Operation): Promise<void> {
    await this.collection!.insertOne(data);
  }
}
