export class Currency {
  symbol: string = '';
  code: string = '';
  name: string = '';
  isActive: boolean = true;
  createdAt: number = Date.now();
  exchangeRates: CurrencyExchangeRate[] = [];
}

export class CurrencyExchangeRate {
  code: string;
  value: number;
}
