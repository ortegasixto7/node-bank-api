import { IUseCaseCommand } from '../../../IUseCase';
import { CreateTokenRequest } from './CreateTokenRequest';
import { IAccountPersistence } from '../../IAccountPersistence';
import { CreateTokenRequestValidation } from './CreateTokenRequestValidation';

export class CreateTokenUseCase implements IUseCaseCommand<CreateTokenRequest> {
  constructor(private readonly accountPersistence: IAccountPersistence) {}

  async execute(request: CreateTokenRequest): Promise<void> {
    new CreateTokenRequestValidation().validate(request);
    const account = await this.accountPersistence.getByAccountIdOrException(request.accountId);
    account.token = `acct_${Date.now()}`;
    await this.accountPersistence.update(account);
  }
}
