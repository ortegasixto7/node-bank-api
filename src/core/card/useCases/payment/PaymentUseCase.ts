import { IUseCaseCommand } from '../../../IUseCase';
import { PaymentRequest } from './PaymentRequest';
import { IAccountPersistence } from '../../../account/IAccountPersistence';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { IOperationPersistence } from '../../../operation/IOperationPersistence';
import { PaymentRequestValidation } from './PaymentRequestValidation';
import { ICardPersistence } from '../../ICardPersistence';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { Operation, OperationTypeEnum } from '../../../operation/Operation';
import { BANK_CARD_PAYMENT_PERCENT_COMMISSION } from '../../../../config/config';

export class PaymentUseCase implements IUseCaseCommand<PaymentRequest> {
  constructor(
    private readonly accountPersistence: IAccountPersistence,
    private readonly cardPersistence: ICardPersistence,
    private readonly userPersistence: IUserPersistence,
    private readonly operationPersistence: IOperationPersistence
  ) {}

  async execute(request: PaymentRequest): Promise<void> {
    new PaymentRequestValidation().validate(request);
    const recipientAccount = await this.accountPersistence.getByAccountTokenOrNull(request.receiverAccountToken);
    if (!recipientAccount || !recipientAccount.isEnabled) throw new BadRequestException(ExceptionCodeEnum.INVALID_OPERATION);
    const card = await this.cardPersistence.getByCardNumberOrNull(request.cardNumber);
    if (!card || !card.isEnabled) throw new BadRequestException(ExceptionCodeEnum.INVALID_OPERATION);
    const senderAccount = await this.accountPersistence.getByAccountIdOrNull(card.accountId);
    if (!senderAccount || !senderAccount.isEnabled) throw new BadRequestException(ExceptionCodeEnum.INVALID_OPERATION);
    if (senderAccount.balance < request.amount) throw new BadRequestException(ExceptionCodeEnum.INSUFFICIENT_FUNDS);
    if (senderAccount.currencyCode !== recipientAccount.currencyCode) throw new BadRequestException(ExceptionCodeEnum.INVALID_OPERATION);
    const recipientUser = await this.userPersistence.getByIdOrException(recipientAccount.userId);
    const senderUser = await this.userPersistence.getByIdOrException(senderAccount.userId);

    senderAccount.balance -= request.amount;
    recipientAccount.balance += request.amount;

    const operation = new Operation();
    operation.amount = request.amount;
    operation.commission = operation.amount * (1 * BANK_CARD_PAYMENT_PERCENT_COMMISSION);
    operation.currencyCode = request.currencyCode;
    operation.recipient.accountNumber = recipientAccount.number;
    operation.recipient.firstName = recipientUser.firstName;
    operation.recipient.lastName = recipientUser.lastName;
    operation.recipient.id = recipientUser.id;
    operation.sender.accountNumber = senderAccount.number;
    operation.sender.firstName = senderUser.firstName;
    operation.sender.lastName = senderUser.lastName;
    operation.sender.id = senderUser.id;
    operation.type = OperationTypeEnum.CARD_PAYMENT;

    await Promise.allSettled([
      this.operationPersistence.create(operation),
      this.accountPersistence.update(senderAccount),
      this.accountPersistence.update(recipientAccount)
    ]);
  }
}
