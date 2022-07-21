import { Account } from './Account';

export interface IAccountPersistence {
  create(data: Account): Promise<void>;
  getByCurrencyCodeAndUserIdOrNull(currencyCode: string, userId: string): Promise<Account | null>;
}
