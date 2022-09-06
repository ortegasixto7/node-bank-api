import { IUseCaseCommand } from '../../../IUseCase';
import { CurrencyConverterRequest } from './CurrencyConverterRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { CurrencyConverterRequestValidation } from './CurrencyConverterRequestValidation';
import { IOperationPersistence } from '../../IOperationPersistence';
import { Operation, OperationTypeEnum } from '../../Operation';
import { IAccountPersistence } from '../../../account/IAccountPersistence';
import { ICurrencyPersistence } from '../../../currency/ICurrencyPersistence';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class CurrencyConverterUseCase implements IUseCaseCommand<CurrencyConverterRequest> {
  constructor(
    private operationPersistence: IOperationPersistence,
    private userPersistence: IUserPersistence,
    private accountPersistence: IAccountPersistence,
    private currencyPersistence: ICurrencyPersistence
  ) {}

  async execute(request: CurrencyConverterRequest): Promise<void> {
    new CurrencyConverterRequestValidation().validate(request);
    const user = await this.userPersistence.getByIdOrException(request.userId);
    const initialAccount = await this.accountPersistence.getByCurrencyCodeAndUserIdOrException(request.initialCurrencyCode, request.userId);
    const finaleAccount = await this.accountPersistence.getByCurrencyCodeAndUserIdOrException(request.finaleCurrencyCode, request.userId);
    const currency = await this.currencyPersistence.getByCodeOrException(request.finaleCurrencyCode);
    const currencyRate = currency.exchangeRates.find((item) => item.code === request.initialCurrencyCode);
    if (!currencyRate) throw new BadRequestException(ExceptionCodeEnum.INSUFFICIENT_FUNDS);

    const commission = request.amount * 0.01;
    if (initialAccount.balance < request.amount * 1.01) throw new BadRequestException(ExceptionCodeEnum.INSUFFICIENT_FUNDS);

    const convertedAmount = request.amount * currencyRate.value;
    initialAccount.balance -= request.amount;
    finaleAccount.balance += convertedAmount;

    const operation = new Operation();
    operation.amount = request.amount;
    operation.commission = commission;
    operation.convertion = {
      convertedAmount: convertedAmount,
      convertedCurrencyCode: request.finaleCurrencyCode,
      rate: currencyRate.value
    };
    operation.currencyCode = request.initialCurrencyCode;
    operation.recipient = {
      accountNumber: finaleAccount.number,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      userName: user.userName
    };
    operation.sender = {
      accountNumber: initialAccount.number,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      userName: user.userName
    };
    operation.type = OperationTypeEnum.CONVERTION;

    await Promise.all([
      this.operationPersistence.create(operation),
      this.accountPersistence.update(initialAccount),
      this.accountPersistence.update(finaleAccount)
    ]);
  }
}
