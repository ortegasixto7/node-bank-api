import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { UpdateRequest } from './UpdateRequest';

export class UpdateRequestValidation implements IRequestValidator<UpdateRequest> {
  validate(request: UpdateRequest): void {
    if (!request.code) throw new BadRequestException(ExceptionCodeEnum.CODE_IS_REQUIRED);
    if (!request.symbol) throw new BadRequestException(ExceptionCodeEnum.SYMBOL_IS_REQUIRED);
  }
}
