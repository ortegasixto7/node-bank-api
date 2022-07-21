import { IAccountPersistence } from '../../core/account/IAccountPersistence';
import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';
import { Account } from '../../core/account/Account';
import { BadRequestException } from '../../core/validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../core/validation/ExceptionCodeEnum';

export class MongoDbAccountPersistence implements IAccountPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('accounts')))
      .catch((err) => console.error(err));
  }

  async getByCurrencyCodeAndUserIdOrException(currencyCode: string, userId: string): Promise<Account> {
    const result = await this.getByCurrencyCodeAndUserIdOrNull(currencyCode, userId);
    if (!result) throw new BadRequestException(ExceptionCodeEnum.USER_CURRENCY_ACCOUNT_NOT_EXIST);
    return result;
  }

  async getByCurrencyCodeAndUserIdOrNull(currencyCode: string, userId: string): Promise<Account | null> {
    const result = await this.collection!.findOne({ currencyCode, userId });
    if (!result) return null;
    return this.getAccountObject(result);
  }

  async update(data: Account): Promise<void> {
    await this.collection!.updateOne({ id: data.id }, { $set: data });
  }

  async create(data: Account): Promise<void> {
    await this.collection!.insertOne(data);
  }

  private getAccountObject(data: any): Account {
    const result = new Account();
    result.id = data.id;
    result.balance = data.balance;
    result.currencyCode = data.currencyCode;
    result.isEnabled = data.isEnabled;
    result.number = data.number;
    result.userId = data.userId;
    return result;
  }
}
