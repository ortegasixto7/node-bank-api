import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { SignInRequest } from './SignInRequest';

export class SignInRequestValidation implements IRequestValidator<SignInRequest> {
  validate(request: SignInRequest): void {
    if (!request.userName) throw new BadRequestException(ExceptionCodeEnum.USER_NAME_IS_REQUIRED);
    if (!request.password) throw new BadRequestException(ExceptionCodeEnum.PASSWORD_IS_REQUIRED);
  }
}
