export class WithdrawRequest {
  userId: string;
  amount: number;

  constructor(request: any) {
    this.userId = request.userId || '';
    this.amount = request.amount || 0;
  }
}
