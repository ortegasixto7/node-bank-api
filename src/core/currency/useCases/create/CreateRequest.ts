export class CreateRequest {
  code: string;
  symbol: string;
  name: string;

  constructor(request: any) {
    this.code = request.code || '';
    this.symbol = request.symbol || '';
    this.name = request.name || '';
  }
}
