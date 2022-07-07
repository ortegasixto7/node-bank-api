import { CurrencyExchangeRate } from '../../Currency';

export class CreateRequest {
  code: string;
  symbol: string;
  name: string;
  exchangeRates: CurrencyExchangeRate[];

  constructor(request: any) {
    this.code = request.code || '';
    this.symbol = request.symbol || '';
    this.name = request.name || '';
    this.exchangeRates = request.exchangeRates || [];
  }
}
