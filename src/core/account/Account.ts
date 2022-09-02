import { randomUUID } from 'crypto';

export class Account {
  id: string = randomUUID();
  number: string = '';
  currencyCode: string = '';
  balance: number = 0;
  isEnabled: boolean = false;
  userId: string = '';
  cardId: string | null = null;
}
