import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { WithdrawRequest } from './WithdrawRequest';

export class WithdrawRequestValidation implements IRequestValidator<WithdrawRequest> {
  validate(request: WithdrawRequest): void {
    if (request.amount < 1) throw new BadRequestException(ExceptionCodeEnum.AMOUNT_NEEDS_TO_BE_GREATER_THAN_ZERO);
    if (!request.currencyCode) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_CODE_IS_REQUIRED);
  }
}
