export class GetAllRequest {
  userId: string;

  constructor(request: any) {
    this.userId = request.userId;
  }
}
