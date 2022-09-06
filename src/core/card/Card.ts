import { randomUUID } from 'crypto';

export class Card {
  id: string = randomUUID();
  number: string = '';
  verificationCode: string = '';
  expirationYear: string = '';
  expirationMonth: string = '';
  expirationTimestamp: number = 0;
  currencyCode: string = '';
  isEnabled: boolean = false;
  accountId: string = '';
  userId: string = '';
}
