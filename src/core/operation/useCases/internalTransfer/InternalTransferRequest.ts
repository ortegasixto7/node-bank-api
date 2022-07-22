export class InternalTransferRequest {
  userId: string;
  recipientAccountNumber: string;
  amount: number;
  currencyCode: string;
  constructor(request: any) {
    this.amount = request.amount || 0;
    this.currencyCode = request.currencyCode || '';
    this.recipientAccountNumber = request.recipientAccountNumber || '';
    this.userId = request.userId || '';
  }
}
