import { Card } from './Card';
export interface ICardPersistence {
  create(data: Card): Promise<void>;
  getByUserIdAndCurrencyCodeOrNull(userId: string, currencyCode: string): Promise<Card | null>;
  getByCardNumberOrNull(cardNumber: string): Promise<Card | null>;
}
