import { AuthRoleEnum } from '../../external/auth/Auth';

export class User {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  balance: number = 0;
  role: AuthRoleEnum = AuthRoleEnum.USER;
  membership: UserMembershipEnum = UserMembershipEnum.CLASSIC;
  createdAt: number = Date.now();
}

export enum UserMembershipEnum {
  CLASSIC = 'CLASSIC',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  SIGNATURE = 'SIGNATURE',
  INFINITE = 'INFINITE'
}
