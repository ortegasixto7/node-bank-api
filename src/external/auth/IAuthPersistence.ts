import { Auth } from './Auth';

export interface IAuthPersistence {
  create(data: Auth): Promise<void>;
  update(data: Auth): Promise<void>;
  getByUserNameOrNull(userName: string): Promise<Auth | null>;
}
