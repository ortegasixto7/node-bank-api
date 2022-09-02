import { BANK_CARD_CODE_PREFIX } from '../../config/config';
import { ICardService } from './ICardService';

export class CardService implements ICardService {
  getExpirationTimestamp(expirationYear: number, expirationMonth: number): number {
    return new Date(expirationYear, expirationMonth - 1, 1).getTime();
  }

  getNumber(): string {
    let result = `${BANK_CARD_CODE_PREFIX}`;
    for (let index = 0; index < 14; index++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

  getVerificationCode(): string {
    let result = '';
    for (let index = 0; index < 3; index++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

  getExpirationYear(): string {
    return (new Date().getFullYear() + 2).toString();
  }

  getExpirationMonth(): string {
    let result = '';
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth <= 9) result = `0${currentMonth}`;
    return result;
  }
}
