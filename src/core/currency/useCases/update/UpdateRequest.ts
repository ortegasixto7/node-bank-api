export class UpdateRequest {
  code: string;
  symbol: string;
  isActive: boolean;

  constructor(request: any) {
    this.code = request.code || '';
    this.symbol = request.symbol || '';
    this.isActive = request.isActive || false;
  }
}
