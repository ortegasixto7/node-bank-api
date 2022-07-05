import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { SignUpRequest } from './SignUpRequest';

export class SignUpRequestRequestValidation implements IRequestValidator<SignUpRequest> {
  validate(request: SignUpRequest): void {
    if (!request.firstName) throw new BadRequestException(ExceptionCodeEnum.FIRST_NAME_IS_REQUIRED);
    if (!request.lastName) throw new BadRequestException(ExceptionCodeEnum.LAST_NAME_IS_REQUIRED);
    if (!request.userName) throw new BadRequestException(ExceptionCodeEnum.USER_NAME_IS_REQUIRED);
    if (!request.password) throw new BadRequestException(ExceptionCodeEnum.PASSWORD_IS_REQUIRED);
  }
}
