import { CurrencyExchangeRate } from '../../Currency';

export class SetExchangeRatesRequest {
  code: string;
  exchangeRates: CurrencyExchangeRate[];

  constructor(request: any) {
    this.code = request.code || '';
    this.exchangeRates = request.exchangeRates || [];
  }
}
