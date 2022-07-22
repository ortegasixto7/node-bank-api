export class CurrencyConverterRequest {
  userId: string;
  initialCurrencyCode: string;
  finaleCurrencyCode: string;
  amount: number;

  constructor(request: any) {
    this.amount = request.amount || 0;
    this.initialCurrencyCode = request.initialCurrencyCode || '';
    this.finaleCurrencyCode = request.finaleCurrencyCode || '';
    this.userId = request.userId || '';
  }
}
