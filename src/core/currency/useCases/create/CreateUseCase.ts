import { IUseCaseCommand } from '../../../IUseCase';
import { CreateRequest } from './CreateRequest';
import { ICurrencyPersistence } from '../../../currency/ICurrencyPersistence';
import { CreateRequestValidation } from './CreateRequestValidation';
import { Currency } from '../../Currency';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class CreateUseCase implements IUseCaseCommand<CreateRequest> {
  constructor(private currencyPersistence: ICurrencyPersistence) {}

  async execute(request: CreateRequest): Promise<void> {
    new CreateRequestValidation().validate(request);

    const currency = new Currency();
    currency.code = request.code;
    currency.symbol = request.symbol;
    currency.name = request.name;
    currency.exchangeRates = request.exchangeRates;

    const existDuplicatedCode = await this.currencyPersistence.getByCodeOrNull(request.code);
    if (existDuplicatedCode) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_CODE_ALREADY_EXIST);

    await this.currencyPersistence.create(currency);
  }
}
