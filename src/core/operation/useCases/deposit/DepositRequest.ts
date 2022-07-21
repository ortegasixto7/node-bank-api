export class DepositRequest {
  userId: string;
  amount: number;
  currencyCode: string;

  constructor(request: any) {
    this.userId = request.userId || '';
    this.currencyCode = request.currencyCode || '';
    this.amount = request.amount || 0;
  }
}
