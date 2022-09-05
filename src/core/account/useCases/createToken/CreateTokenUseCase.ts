import { IUseCaseCommand } from '../../../IUseCase';
import { CreateTokenRequest } from './CreateTokenRequest';
import { IAccountPersistence } from '../../IAccountPersistence';
import { CreateTokenRequestValidation } from './CreateTokenRequestValidation';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class CreateTokenUseCase implements IUseCaseCommand<CreateTokenRequest> {
  constructor(private readonly accountPersistence: IAccountPersistence) {}

  async execute(request: CreateTokenRequest): Promise<void> {
    new CreateTokenRequestValidation().validate(request);
    const account = await this.accountPersistence.getByAccountIdOrException(request.accountId);
    if (account.token) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_TOKEN_ALREADY_EXIST);
    account.token = `acctok_${Date.now()}`;
    await this.accountPersistence.update(account);
  }
}
