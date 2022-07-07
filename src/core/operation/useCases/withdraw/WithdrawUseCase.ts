import { IUseCaseCommand } from '../../../IUseCase';
import { WithdrawRequest } from './WithdrawRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { WithdrawRequestValidation } from './WithdrawRequestValidation';
import { IOperationPersistence } from '../../IOperationPersistence';
import { Operation, OperationTypeEnum } from '../../Operation';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class WithdrawUseCase implements IUseCaseCommand<WithdrawRequest> {
  constructor(private operationPersistence: IOperationPersistence, private userPersistence: IUserPersistence) {}

  async execute(request: WithdrawRequest): Promise<void> {
    new WithdrawRequestValidation().validate(request);

    const user = await this.userPersistence.getByIdOrException(request.userId);
    if (user.balance < request.amount) throw new BadRequestException(ExceptionCodeEnum.INSUFFICIENT_FUNDS);
    user.balance -= request.amount;

    const operation = new Operation();
    operation.amount = request.amount;
    operation.type = OperationTypeEnum.WITHDRAW;
    operation.user = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName
    };

    await Promise.all([this.operationPersistence.create(operation), this.userPersistence.update(user)]);
  }
}
