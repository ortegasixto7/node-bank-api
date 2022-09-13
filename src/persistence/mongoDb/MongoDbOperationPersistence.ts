import { Collection, Db } from 'mongodb';
import { IOperationPersistence } from '../../core/operation/IOperationPersistence';
import { Operation } from '../../core/operation/Operation';

export class MongoDbOperationPersistence implements IOperationPersistence {
  private collection: Collection;
  constructor(database: Db) {
    this.collection = database.collection('operations');
  }

  async getAllByCardId(cardId: string): Promise<Operation[]> {
    const result: Operation[] = [];
    const resultData = await this.collection.find({ 'cardPayment.id': cardId }).toArray();
    resultData.map((item) => {
      result.push(item as any as Operation);
    });
    return result;
  }

  async create(data: Operation): Promise<void> {
    await this.collection.insertOne(data);
  }
}
