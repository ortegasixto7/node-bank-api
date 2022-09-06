import { IUseCaseCommand } from '../../../IUseCase';
import { CreateRequest } from './CreateRequest';
import { IAccountPersistence } from '../../IAccountPersistence';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { ICurrencyPersistence } from '../../../currency/ICurrencyPersistence';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { Account } from '../../Account';

export class CreateUseCase implements IUseCaseCommand<CreateRequest> {
  constructor(
    private accountPersistence: IAccountPersistence,
    private currencyPersistence: ICurrencyPersistence,
    private userPersistence: IUserPersistence
  ) {}

  async execute(request: CreateRequest): Promise<void> {
    if (!request.currencyCode) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_CODE_IS_REQUIRED);
    const currency = await this.currencyPersistence.getActiveByCodeOrException(request.currencyCode);
    const user = await this.userPersistence.getByIdOrException(request.userId);
    const account = new Account();
    account.currencyCode = currency.code;
    account.isEnabled = true;
    account.userId = user.id;
    account.number = `${currency.code}${user.createdAt}`;
    const hasUserAnotherAccountInTheCurrency = await this.accountPersistence.getByCurrencyCodeAndUserIdOrNull(request.currencyCode, request.userId);
    if (hasUserAnotherAccountInTheCurrency) throw new BadRequestException(ExceptionCodeEnum.USER_CURRENCY_ACCOUNT_ALREADY_EXIST);
    await this.accountPersistence.create(account);
  }
}
