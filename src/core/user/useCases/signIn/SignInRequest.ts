export class SignInRequest {
  userName: string;
  password: string;

  constructor(request: any) {
    this.userName = request.userName || '';
    this.password = request.password || '';
  }
}
