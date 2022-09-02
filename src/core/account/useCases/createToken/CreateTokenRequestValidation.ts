import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { CreateTokenRequest } from './CreateTokenRequest';

export class CreateTokenRequestValidation implements IRequestValidator<CreateTokenRequest> {
  validate(request: CreateTokenRequest): void {
    if (!request.accountId) throw new BadRequestException(ExceptionCodeEnum.ACCOUNT_ID_IS_REQUIRED);
  }
}
