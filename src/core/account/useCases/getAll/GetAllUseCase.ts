import { GetAllRequest } from './GetAllRequest';
import { IUseCaseQuery } from '../../../IUseCase';
import { IAccountPersistence } from '../../IAccountPersistence';

export class GetAllUseCase implements IUseCaseQuery<GetAllRequest> {
  constructor(private accountPersistence: IAccountPersistence) {}

  async execute(request: GetAllRequest): Promise<any> {
    return await this.accountPersistence.getAllByUserId(request.userId);
  }
}
