import { IUserPersistence } from '../../core/user/IUserPersistence';
import { User } from '../../core/user/User';
import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';

export class MongoDbUserPersistence implements IUserPersistence {
  private userCollection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.userCollection = db.collection('users')))
      .catch((err) => console.error(err));
  }

  async create(data: User): Promise<void> {
    await this.userCollection!.insertOne(data);
  }

  async update(data: User): Promise<void> {
    await this.userCollection!.updateOne({ id: data.id }, data);
  }

  async getByIdOrNull(id: string): Promise<User | null> {
    await this.userCollection!.findOne({ id });
    return null;
  }

  async getByUserNameOrNull(userName: string): Promise<User | null> {
    await this.userCollection!.findOne({ userName });
    return null;
  }
}
