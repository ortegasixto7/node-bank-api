import { AuthRoleEnum } from '../../external/auth/Auth';

export class User {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  balance: number = 0;
  role: AuthRoleEnum = AuthRoleEnum.CLASSIC;
}
