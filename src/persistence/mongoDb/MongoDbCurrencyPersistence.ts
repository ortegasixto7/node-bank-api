import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';
import { Currency } from '../../core/currency/Currency';
import { ICurrencyPersistence } from '../../core/currency/ICurrencyPersistence';
import { BadRequestException } from '../../core/validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../core/validation/ExceptionCodeEnum';

export class MongoDbCurrencyPersistence implements ICurrencyPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('currencies')))
      .catch((err) => console.error(err));
  }

  async create(data: Currency): Promise<void> {
    await this.collection!.insertOne(data);
  }

  async update(data: Currency): Promise<void> {
    await this.collection!.updateOne({ code: data.code }, { $set: data });
  }

  async getByCodeOrNull(code: string): Promise<Currency | null> {
    const result = await this.collection!.findOne({ code });
    if (!result) return null;
    return this.getCurrencyObject(result);
  }

  async getByCodeOrException(code: string): Promise<Currency> {
    const result = await this.getByCodeOrNull(code);
    if (!result) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_NOT_FOUND);
    return result;
  }

  async getAllActive(): Promise<Currency[]> {
    const data: Currency[] = [];
    const result = await this.collection!.find({ isActive: true }).toArray();
    result.map((item) => {
      data.push(this.getCurrencyObject(item));
    });

    return data;
  }

  async getAllInactive(): Promise<Currency[]> {
    return [];
  }

  private getCurrencyObject(data: any): Currency {
    const result = new Currency();
    result.code = data.code;
    result.createdAt = data.createdAt;
    result.exchangeRates = data.exchangeRates;
    result.id = data.id;
    result.isActive = data.isActive;
    result.name = data.name;
    result.symbol = data.symbol;
    return result;
  }
}
