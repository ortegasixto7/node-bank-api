import { IUserPersistence } from '../../core/user/IUserPersistence';
import { User } from '../../core/user/User';
import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';
import { BadRequestException } from '../../core/validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../core/validation/ExceptionCodeEnum';

export class MongoDbUserPersistence implements IUserPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('users')))
      .catch((err) => console.error(err));
  }

  async create(data: User): Promise<void> {
    await this.collection!.insertOne(data);
  }

  async update(data: User): Promise<void> {
    await this.collection!.updateOne({ id: data.id }, data);
  }

  async getByIdOrNull(id: string): Promise<User | null> {
    await this.collection!.findOne({ id });
    return null;
  }

  async getByIdOrException(id: string): Promise<User> {
    const result = await this.getByIdOrNull(id);
    if (!result) throw new BadRequestException(ExceptionCodeEnum.USER_NOT_FOUND);
    return result;
  }

  async getByUserNameOrNull(userName: string): Promise<User | null> {
    await this.collection!.findOne({ userName });
    return null;
  }
}
