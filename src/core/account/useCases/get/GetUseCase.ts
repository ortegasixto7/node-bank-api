import { GetRequest } from './GetRequest';
import { GetResponse } from './GetResponse';
import { IUseCaseQuery } from '../../../IUseCase';
import { IAccountPersistence } from '../../IAccountPersistence';

export class GetUseCase implements IUseCaseQuery<GetRequest> {
  constructor(private accountPersistence: IAccountPersistence) {}

  async execute(request: GetRequest): Promise<any> {
    const account = await this.accountPersistence.getByUserIdAndCurrencyCodeOrException(request.userId, request.currencyCode);
    const result = new GetResponse();
    result.balance = account.balance;
    result.cardId = account.cardId;
    result.currencyCode = account.currencyCode;
    result.id = account.id;
    result.isEnabled = account.isEnabled;
    result.number = account.number;
    return result;
  }
}
