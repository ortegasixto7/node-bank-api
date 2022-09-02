import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { CreateRequest } from './CreateRequest';

export class CreateRequestValidation implements IRequestValidator<CreateRequest> {
  validate(request: CreateRequest): void {
    if (!request.currencyCode) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_CODE_IS_REQUIRED);
  }
}
