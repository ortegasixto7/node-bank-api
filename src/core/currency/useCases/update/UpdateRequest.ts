export class UpdateRequest {
  code: string;
  symbol: string;
  name: string;
  isActive: boolean;

  constructor(request: any) {
    this.code = request.code || '';
    this.symbol = request.symbol || '';
    this.name = request.name || '';
    this.isActive = request.isActive || false;
  }
}
