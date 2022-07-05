export class SignUpRequest {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;

  constructor(request: any) {
    this.firstName = request.firstName || '';
    this.lastName = request.lastName || '';
    this.userName = request.userName || '';
    this.password = request.password || '';
  }
}
