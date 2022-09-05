import { IUseCaseCommand } from '../../../IUseCase';
import { DepositRequest } from './DepositRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { DepositRequestValidation } from './DepositRequestValidation';
import { IOperationPersistence } from '../../IOperationPersistence';
import { Operation, OperationTypeEnum } from '../../Operation';
import { IAccountPersistence } from '../../../account/IAccountPersistence';

export class DepositUseCase implements IUseCaseCommand<DepositRequest> {
  constructor(
    private operationPersistence: IOperationPersistence,
    private userPersistence: IUserPersistence,
    private accountPersistence: IAccountPersistence
  ) {}

  async execute(request: DepositRequest): Promise<void> {
    new DepositRequestValidation().validate(request);
    const operation = new Operation();
    operation.amount = request.amount;
    operation.currencyCode = request.currencyCode;
    operation.type = OperationTypeEnum.DEPOSIT;

    const user = await this.userPersistence.getByIdOrException(request.userId);
    const account = await this.accountPersistence.getByCurrencyCodeAndUserIdOrException(request.currencyCode, request.userId);
    account.balance += request.amount;
    operation.sender = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      accountNumber: account.number,
      userName: user.userName
    };
    operation.recipient = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      accountNumber: account.number,
      userName: user.userName
    };
    await Promise.all([this.operationPersistence.create(operation), this.accountPersistence.update(account)]);
  }
}
