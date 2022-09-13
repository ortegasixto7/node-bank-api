import { Collection, Db } from 'mongodb';
import { ICardPersistence } from '../../core/card/ICardPersistence';
import { Card } from '../../core/card/Card';
import { BadRequestException } from '../../core/validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../core/validation/ExceptionCodeEnum';

export class MongoDbCardPersistence implements ICardPersistence {
  private collection: Collection;
  constructor(database: Db) {
    this.collection = database.collection('cards');
  }

  async getByCardIdAndUserIdOrException(cardId: string, userId: string): Promise<Card> {
    const result = await this.collection.findOne({ id: cardId, userId });
    if (!result) throw new BadRequestException(ExceptionCodeEnum.CARD_NOT_FOUND);
    return result as any as Card;
  }

  async getByCardNumberOrException(cardNumber: string): Promise<Card> {
    const result = await this.getByCardNumberOrNull(cardNumber);
    if (!result) throw new BadRequestException(ExceptionCodeEnum.CARD_NOT_FOUND);
    return result;
  }

  async getByCardNumberOrNull(cardNumber: string): Promise<Card | null> {
    const result = await this.collection.findOne({ number: cardNumber });
    if (!result) return null;
    return result as any as Card;
  }

  async getByUserIdAndCurrencyCodeOrNull(userId: string, currencyCode: string): Promise<Card | null> {
    const result = await this.collection.findOne({ userId, currencyCode });
    if (!result) return null;
    return result as any as Card;
  }

  async create(data: Card): Promise<void> {
    await this.collection.insertOne(data);
  }
}
