import { Card } from './Card';
export interface ICardPersistence {
  create(data: Card): Promise<void>;
  getByCardIdAndUserIdOrException(cardId: string, userId: string): Promise<Card>;
  getByUserIdAndCurrencyCodeOrNull(userId: string, currencyCode: string): Promise<Card | null>;
  getByCardNumberOrNull(cardNumber: string): Promise<Card | null>;
  getByCardNumberOrException(cardNumber: string): Promise<Card>;
}
