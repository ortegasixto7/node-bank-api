export class Auth {
  id: string = '';
  userName: string = '';
  password: string = '';
  role: AuthRoleEnum = AuthRoleEnum.USER;
}

export enum AuthRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
