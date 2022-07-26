import { IAccountPersistence } from '../../core/account/IAccountPersistence';
import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';
import { Account } from '../../core/account/Account';
import { BadRequestException } from '../../core/validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../core/validation/ExceptionCodeEnum';
import { GetAllResponse } from '../../core/account/useCases/getAll/GetAllResponse';

export class MongoDbAccountPersistence implements IAccountPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('accounts')))
      .catch((err) => console.error(err));
  }

  async getAllByUserId(userId: string): Promise<GetAllResponse[]> {
    const result: GetAllResponse[] = [];
    const resultData = await this.collection!.find({ userId }).toArray();
    resultData.map((item) => {
      const data = new GetAllResponse();
      data.id = item.id;
      data.balance = item.balance;
      data.currencyCode = item.currencyCode;
      data.isEnabled = item.isEnabled;
      data.number = item.number;
      result.push(data);
    });
    return result;
  }

  async getByAccountNumberOrException(accountNumber: string): Promise<Account> {
    const result = await this.collection!.findOne({ number: accountNumber });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_NUMBER_NOT_EXIST);
    return this.getAccountObject(result);
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
