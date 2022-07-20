import { randomUUID } from 'crypto';

export class Currency {
  id: string = randomUUID();
  symbol: string = '';
  code: string = '';
  name: string = '';
  isActive: boolean = true;
  createdAt: number = Date.now();
  exchangeRates: CurrencyExchangeRate[] = [];
}

export class CurrencyExchangeRate {
  code: string = '';
  value: number = 0;
}
