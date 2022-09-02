import { Collection } from 'mongodb';
import { MongoDbClient } from './MongoDbClient';
import { ICardPersistence } from '../../core/card/ICardPersistence';
import { Card } from '../../core/card/Card';

export class MongoDbCardPersistence implements ICardPersistence {
  private collection?: Collection;
  constructor() {
    MongoDbClient.getInstance()
      .then((db) => (this.collection = db.collection('cards')))
      .catch((err) => console.error(err));
  }

  async getByCardNumberOrNull(cardNumber: string): Promise<Card | null> {
    const result = await this.collection!.findOne({ number: cardNumber });
    if (!result) return null;
    return result as any as Card;
  }

  async getByUserIdAndCurrencyCodeOrNull(userId: string, currencyCode: string): Promise<Card | null> {
    const result = await this.collection!.findOne({ userId, currencyCode });
    if (!result) return null;
    return result as any as Card;
  }

  async create(data: Card): Promise<void> {
    await this.collection!.insertOne(data);
  }
}
