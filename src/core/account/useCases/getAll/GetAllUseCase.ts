import { GetAllRequest } from './GetAllRequest';
import { GetAllResponse } from './GetAllResponse';
import { IUseCaseQuery } from '../../../IUseCase';
import { IAccountPersistence } from '../../IAccountPersistence';

export class GetAllUseCase implements IUseCaseQuery<GetAllRequest> {
  constructor(private accountPersistence: IAccountPersistence) {}

  async execute(request: GetAllRequest): Promise<any> {
    const data = await this.accountPersistence.getAllByUserId(request.userId);
    const result: GetAllResponse[] = [];
    data.map((item) => {
      const account = new GetAllResponse();
      account.balance = item.balance;
      account.cardId = item.cardId;
      account.currencyCode = item.currencyCode;
      account.id = item.id;
      account.isEnabled = item.isEnabled;
      account.number = item.number;
      account.token = item.token;
      result.push(account);
    });
    return result;
  }
}
