import { IUseCaseCommand } from '../../../IUseCase';
import { DepositRequest } from './DepositRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { DepositRequestValidation } from './DepositRequestValidation';
import { IOperationPersistence } from '../../IOperationPersistence';
import { Operation, OperationTypeEnum } from '../../Operation';

export class DepositUseCase implements IUseCaseCommand<DepositRequest> {
  constructor(private operationPersistence: IOperationPersistence, private userPersistence: IUserPersistence) {}

  async execute(request: DepositRequest): Promise<void> {
    new DepositRequestValidation().validate(request);
    const operation = new Operation();
    operation.amount = request.amount;
    operation.type = OperationTypeEnum.DEPOSIT;

    const user = await this.userPersistence.getByIdOrException(request.userId);
    user.balance += request.amount;
    operation.user = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName
    };
    await Promise.all([this.operationPersistence.create(operation), this.userPersistence.update(user)]);
  }
}
