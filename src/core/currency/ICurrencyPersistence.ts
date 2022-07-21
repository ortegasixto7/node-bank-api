import { Currency } from './Currency';

export interface ICurrencyPersistence {
  create(data: Currency): Promise<void>;
  update(data: Currency): Promise<void>;
  getByCodeOrNull(code: string): Promise<Currency | null>;
  getByCodeOrException(code: string): Promise<Currency>;
  getActiveByCodeOrException(code: string): Promise<Currency>;
  getAllActive(): Promise<Currency[]>;
  getAllInactive(): Promise<Currency[]>;
}
