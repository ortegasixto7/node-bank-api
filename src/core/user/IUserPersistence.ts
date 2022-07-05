import { User } from './User';

export interface IUserPersistence {
  create(data: User): Promise<void>;
  update(data: User): Promise<void>;
  getByIdOrNull(id: string): Promise<null | User>;
  getByUserNameOrNull(userName: string): Promise<null | User>;
}
