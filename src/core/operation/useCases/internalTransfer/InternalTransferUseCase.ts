import { IUseCaseCommand } from '../../../IUseCase';
import { InternalTransferRequest } from './InternalTransferRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { InternalTransferRequestValidation } from './InternalTransferRequestValidation';
import { IOperationPersistence } from '../../IOperationPersistence';
import { Operation, OperationTypeEnum } from '../../Operation';
import { IAccountPersistence } from '../../../account/IAccountPersistence';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class InternalTransferUseCase implements IUseCaseCommand<InternalTransferRequest> {
  constructor(
    private operationPersistence: IOperationPersistence,
    private userPersistence: IUserPersistence,
    private accountPersistence: IAccountPersistence
  ) {}

  async execute(request: InternalTransferRequest): Promise<void> {
    new InternalTransferRequestValidation().validate(request);
    const senderUser = await this.userPersistence.getByIdOrException(request.userId);
    const senderAccount = await this.accountPersistence.getByCurrencyCodeAndUserIdOrException(request.currencyCode, request.userId);
    const recipientAccount = await this.accountPersistence.getByAccountNumberOrException(request.recipientAccountNumber);
    const recipientUser = await this.userPersistence.getByIdOrException(recipientAccount.userId);

    if (senderAccount.balance) throw new BadRequestException(ExceptionCodeEnum.INSUFFICIENT_FUNDS);
    senderAccount.balance -= request.amount;
    recipientAccount.balance += request.amount;

    const operation = new Operation();
    operation.amount = request.amount;
    operation.currencyCode = recipientAccount.currencyCode;
    operation.type = OperationTypeEnum.INTERNAL_TRANSFER;
    operation.recipient = {
      accountNumber: recipientAccount.number,
      firstName: recipientUser.firstName,
      lastName: recipientUser.lastName,
      id: recipientUser.id
    };
    operation.sender = {
      accountNumber: senderAccount.number,
      firstName: senderUser.firstName,
      lastName: senderUser.lastName,
      id: senderUser.id
    };

    await Promise.allSettled([
      this.operationPersistence.create(operation),
      this.accountPersistence.update(senderAccount),
      this.accountPersistence.update(recipientAccount)
    ]);
  }
}
