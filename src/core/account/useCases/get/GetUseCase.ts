import { GetRequest } from './GetRequest';
import { IUseCaseQuery } from '../../../IUseCase';
import { IAccountPersistence } from '../../IAccountPersistence';

export class GetUseCase implements IUseCaseQuery<GetRequest> {
  constructor(private accountPersistence: IAccountPersistence) {}

  async execute(request: GetRequest): Promise<any> {
    return await this.accountPersistence.getByUserIdAndCurrencyCodeOrException(request.userId, request.currencyCode);
  }
}
