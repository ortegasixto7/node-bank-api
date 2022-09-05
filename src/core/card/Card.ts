import { randomUUID } from 'crypto';

export class Card {
  id: string = randomUUID();
  number: string = '';
  verificationCode: string = '';
  expirationYear: string = '1900';
  expirationMonth: string = '01';
  expirationTimestamp: number = 0;
  currencyCode: string = '';
  isEnabled: boolean = false;
  accountId: string = '';
  userId: string = '';
}
