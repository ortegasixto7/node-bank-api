import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { CreateRequest } from './CreateRequest';

export class CreateRequestValidation implements IRequestValidator<CreateRequest> {
  validate(request: CreateRequest): void {
    if (!request.code) throw new BadRequestException(ExceptionCodeEnum.CODE_IS_REQUIRED);
    if (!request.symbol) throw new BadRequestException(ExceptionCodeEnum.SYMBOL_IS_REQUIRED);
  }
}
