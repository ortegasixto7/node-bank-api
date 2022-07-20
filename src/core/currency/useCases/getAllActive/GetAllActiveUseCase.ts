import { IUseCaseQuery } from '../../../IUseCase';
import { ICurrencyPersistence } from '../../ICurrencyPersistence';

export class GetAllActiveUseCase implements IUseCaseQuery<any> {
  constructor(private currencyPersistence: ICurrencyPersistence) {}

  async execute(): Promise<any> {
    return await this.currencyPersistence.getAllActive();
  }
}
