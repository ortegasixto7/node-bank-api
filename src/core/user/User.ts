export class User {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  password: string = '';
  balance: number = 0;
  role: UserRoleEnum = UserRoleEnum.CLASSIC;
}

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CLASSIC = 'CLASSIC',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  SIGNATURE = 'SIGNATURE',
  INFINITE = 'INFINITE'
}
