import { Account } from './Account';

export interface IAccountPersistence {
  create(data: Account): Promise<void>;
  update(data: Account): Promise<void>;
  getByCurrencyCodeAndUserIdOrNull(currencyCode: string, userId: string): Promise<Account | null>;
  getByCurrencyCodeAndUserIdOrException(currencyCode: string, userId: string): Promise<Account>;
}
