export class PaymentRequest {
  cardNumber: string;
  expirationYear: string;
  expirationMonth: string;
  currencyCode: string;
  verificationCode: string;
  amount: number;
  receiverAccountToken: string;

  constructor(request: any) {
    this.cardNumber = request.cardNumber || '';
    this.expirationYear = request.expirationYear || '';
    this.expirationMonth = request.expirationMonth || '';
    this.currencyCode = request.currencyCode || '';
    this.verificationCode = request.verificationCode || '';
    this.amount = request.amount || 0;
    this.receiverAccountToken = request.receiverAccountToken || '';
  }
}
