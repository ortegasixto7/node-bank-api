import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { CurrencyConverterRequest } from './CurrencyConverterRequest';

export class CurrencyConverterRequestValidation implements IRequestValidator<CurrencyConverterRequest> {
  validate(request: CurrencyConverterRequest): void {
    if (request.amount < 1) throw new BadRequestException(ExceptionCodeEnum.AMOUNT_NEEDS_TO_BE_GREATER_THAN_ZERO);
    if (!request.initialCurrencyCode) throw new BadRequestException(ExceptionCodeEnum.INITIAL_CURRENCY_CODE_IS_REQUIRED);
    if (!request.finaleCurrencyCode) throw new BadRequestException(ExceptionCodeEnum.FINALE_CURRENCY_CODE_IS_REQUIRED);
  }
}
