import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { DepositRequest } from './DepositRequest';

export class DepositRequestValidation implements IRequestValidator<DepositRequest> {
  validate(request: DepositRequest): void {
    if (request.amount < 1) throw new BadRequestException(ExceptionCodeEnum.AMOUNT_NEEDS_TO_BE_GREATER_THAN_ZERO);
  }
}
