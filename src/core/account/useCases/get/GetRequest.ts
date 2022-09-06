export class GetRequest {
  userId: string;
  currencyCode: string;

  constructor(request: any) {
    this.userId = request.userId;
    this.currencyCode = request.currencyCode;
  }
}
