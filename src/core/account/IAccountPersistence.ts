import { Account } from './Account';
import { GetResponse } from './useCases/get/GetResponse';
import { GetAllResponse } from './useCases/getAll/GetAllResponse';

export interface IAccountPersistence {
  create(data: Account): Promise<void>;
  update(data: Account): Promise<void>;
  getByCurrencyCodeAndUserIdOrNull(currencyCode: string, userId: string): Promise<Account | null>;
  getByCurrencyCodeAndUserIdOrException(currencyCode: string, userId: string): Promise<Account>;
  getByAccountNumberOrException(accountNumber: string): Promise<Account>;
  getAllByUserId(userId: string): Promise<GetAllResponse[]>;
  getByUserIdAndCurrencyCodeOrException(userId: string, currencyCode: string): Promise<GetResponse>;
}
