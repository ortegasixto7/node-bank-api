export class WithdrawRequest {
  userId: string;
  amount: number;
  currencyCode: string;

  constructor(request: any) {
    this.userId = request.userId || '';
    this.amount = request.amount || 0;
    this.currencyCode = request.currencyCode || '';
  }
}
