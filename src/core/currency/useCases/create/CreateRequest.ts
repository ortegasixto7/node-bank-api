export class CreateRequest {
  code: string;
  symbol: string;

  constructor(request: any) {
    this.code = request.code || '';
    this.symbol = request.symbol || '';
  }
}
