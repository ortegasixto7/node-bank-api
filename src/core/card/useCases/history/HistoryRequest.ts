export class HistoryRequest {
  userId: string;
  cardId: string;

  constructor(request: any) {
    this.userId = request.userId || '';
    this.cardId = request.cardId || '';
  }
}
