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

  async getAllByCardId(cardId: string): Promise<Operation[]> {
    const result: Operation[] = [];
    const resultData = await this.collection!.find({ 'cardPayment.id': cardId }).toArray();
    resultData.map((item) => {
      result.push(item as any as Operation);
    });
    return result;
  }

  async create(data: Operation): Promise<void> {
    await this.collection!.insertOne(data);
  }
}
