import { Auth } from '../../external/auth/Auth';
import { IAuthPersistence } from '../../external/auth/IAuthPersistence';
import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';

export class MongoDbAuthPersistence implements IAuthPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('auth')))
      .catch((err) => console.error(err));
  }

  async create(data: Auth): Promise<void> {
    await this.collection!.insertOne(data);
  }

  async update(data: Auth): Promise<void> {
    await this.collection!.updateOne({ id: data.id }, data);
  }

  async getByUserNameOrNull(userName: string): Promise<Auth | null> {
    const result = await this.collection!.findOne({ userName });
    if (!result) return null;
    return result as any as Auth;
  }
}
