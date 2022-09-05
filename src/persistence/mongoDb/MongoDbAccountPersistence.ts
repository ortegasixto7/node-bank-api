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

  async getByUserIdAndCurrencyCodeOrException(userId: string, currencyCode: string): Promise<Account> {
    const result = await this.collection!.findOne({ userId, currencyCode });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.USER_CURRENCY_ACCOUNT_NOT_EXIST);
    return result as any as Account;
  }

  async getAllByUserId(userId: string): Promise<Account[]> {
    const result: Account[] = [];
    const resultData = await this.collection!.find({ userId }).toArray();
    resultData.map((item) => {
      result.push(item as any as Account);
    });
    return result;
  }

  async getByAccountNumberOrException(accountNumber: string): Promise<Account> {
    const result = await this.collection!.findOne({ number: accountNumber });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_NUMBER_NOT_EXIST);
    return result as any as Account;
  }

  async getByAccountIdOrException(accountId: string): Promise<Account> {
    const result = await this.collection!.findOne({ id: accountId });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_NOT_EXIST);
    return result as any as Account;
  }

  async getByAccountIdOrNull(accountId: string): Promise<Account | null> {
    const result = await this.collection!.findOne({ id: accountId });
    if (!result) return null;
    return result as any as Account;
  }

  async getByAccountTokenOrException(accountToken: string): Promise<Account> {
    const result = await this.collection!.findOne({ token: accountToken });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_NOT_EXIST);
    return result as any as Account;
  }

  async getByAccountTokenOrNull(accountToken: string): Promise<Account | null> {
    const result = await this.collection!.findOne({ token: accountToken });
    if (!result) return null;
    return result as any as Account;
  }

  async getByUserIdAndAccountIdOrException(userId: string, accountId: string): Promise<Account> {
    const result = await this.collection!.findOne({ userId, id: accountId });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_NOT_EXIST);
    return result as any as Account;
  }

  async getByCurrencyCodeAndUserIdOrException(currencyCode: string, userId: string): Promise<Account> {
    const result = await this.getByCurrencyCodeAndUserIdOrNull(currencyCode, userId);
    if (!result) throw new BadRequestException(ExceptionCodeEnum.USER_CURRENCY_ACCOUNT_NOT_EXIST);
    return result;
  }

  async getByCurrencyCodeAndUserIdOrNull(currencyCode: string, userId: string): Promise<Account | null> {
    const result = await this.collection!.findOne({ currencyCode, userId });
    if (!result) return null;
    return result as any as Account;
  }

  async update(data: Account): Promise<void> {
    await this.collection!.updateOne({ id: data.id }, { $set: data });
  }

  async create(data: Account): Promise<void> {
    await this.collection!.insertOne(data);
  }
}
