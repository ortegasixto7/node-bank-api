export class CreateRequest {
  currencyCode: string;
  userId: string;

  constructor(request: any) {
    this.currencyCode = request.currencyCode ?? '';
    this.userId = request.userId ?? '';
  }
}
