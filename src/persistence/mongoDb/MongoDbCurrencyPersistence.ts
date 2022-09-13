import { Collection, Db } from 'mongodb';
import { Currency } from '../../core/currency/Currency';
import { ICurrencyPersistence } from '../../core/currency/ICurrencyPersistence';
import { BadRequestException } from '../../core/validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../core/validation/ExceptionCodeEnum';

export class MongoDbCurrencyPersistence implements ICurrencyPersistence {
  private collection: Collection;
  constructor(database: Db) {
    this.collection = database.collection('currencies');
  }

  async getActiveByCodeOrException(code: string): Promise<Currency> {
    const result = await this.getByCodeOrNull(code);
    if (!result || !result.isActive) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_NOT_FOUND);
    return result;
  }

  async create(data: Currency): Promise<void> {
    await this.collection.insertOne(data);
  }

  async update(data: Currency): Promise<void> {
    await this.collection.updateOne({ code: data.code }, { $set: data });
  }

  async getByCodeOrNull(code: string): Promise<Currency | null> {
    const result = await this.collection.findOne({ code });
    if (!result) return null;
    return result as any as Currency;
  }

  async getByCodeOrException(code: string): Promise<Currency> {
    const result = await this.getByCodeOrNull(code);
    if (!result) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_NOT_FOUND);
    return result;
  }

  async getAllActive(): Promise<Currency[]> {
    const data: Currency[] = [];
    const result = await this.collection.find({ isActive: true }).toArray();
    result.map((item) => {
      data.push(item as any as Currency);
    });

    return data;
  }

  async getAllInactive(): Promise<Currency[]> {
    return [];
  }
}
