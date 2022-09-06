export class CreateTokenRequest {
  userId: string;
  accountId: string;

  constructor(request: any) {
    this.accountId = request.accountId || '';
    this.userId = request.userId || '';
  }
}
