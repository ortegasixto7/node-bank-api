import { IUseCaseCommand } from '../../../IUseCase';
import { WithdrawRequest } from './WithdrawRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { WithdrawRequestValidation } from './WithdrawRequestValidation';
import { IOperationPersistence } from '../../IOperationPersistence';
import { Operation, OperationTypeEnum } from '../../Operation';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { IAccountPersistence } from '../../../account/IAccountPersistence';

export class WithdrawUseCase implements IUseCaseCommand<WithdrawRequest> {
  constructor(
    private operationPersistence: IOperationPersistence,
    private userPersistence: IUserPersistence,
    private accountPersistence: IAccountPersistence
  ) {}

  async execute(request: WithdrawRequest): Promise<void> {
    new WithdrawRequestValidation().validate(request);

    const user = await this.userPersistence.getByIdOrException(request.userId);
    const account = await this.accountPersistence.getByCurrencyCodeAndUserIdOrException(request.currencyCode, request.userId);
    if (account.balance < request.amount) throw new BadRequestException(ExceptionCodeEnum.INSUFFICIENT_FUNDS);
    account.balance -= request.amount;

    const operation = new Operation();
    operation.amount = request.amount;
    operation.currencyCode = request.currencyCode;
    operation.type = OperationTypeEnum.WITHDRAW;
    operation.user = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName
    };

    await Promise.all([this.operationPersistence.create(operation), this.accountPersistence.update(account)]);
  }
}
