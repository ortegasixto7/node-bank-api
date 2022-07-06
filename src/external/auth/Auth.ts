export class Auth {
  id: string = '';
  userName: string = '';
  password: string = '';
  role: AuthRoleEnum = AuthRoleEnum.CLASSIC;
}

export enum AuthRoleEnum {
  ADMIN = 'ADMIN',
  CLASSIC = 'CLASSIC',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  SIGNATURE = 'SIGNATURE',
  INFINITE = 'INFINITE'
}
