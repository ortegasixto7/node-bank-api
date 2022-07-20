import { IUseCaseCommand } from '../../../IUseCase';
import { SetExchangeRatesRequest } from './SetExchangeRatesRequest';
import { ICurrencyPersistence } from '../../../currency/ICurrencyPersistence';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class SetExchangeRatesUseCase implements IUseCaseCommand<SetExchangeRatesRequest> {
  constructor(private currencyPersistence: ICurrencyPersistence) {}

  async execute(request: SetExchangeRatesRequest): Promise<void> {
    if (!request.code) throw new BadRequestException(ExceptionCodeEnum.CODE_IS_REQUIRED);
    const currency = await this.currencyPersistence.getByCodeOrException(request.code);
    currency.exchangeRates = request.exchangeRates;
    await this.currencyPersistence.update(currency);
  }
}
