import { Operation } from './Operation';

export interface IOperationPersistence {
  create(data: Operation): Promise<void>;
}
