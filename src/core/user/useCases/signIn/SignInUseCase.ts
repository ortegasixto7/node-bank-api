import { IUseCaseQuery } from '../../../IUseCase';
import { SignInRequest } from './SignInRequest';
import { IAuthPersistence } from '../../../../external/auth/IAuthPersistence';
import { SignInRequestValidation } from './SignInRequestValidation';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../config/config';

export class SignInUseCase implements IUseCaseQuery<SignInRequest> {
  constructor(private authPersistence: IAuthPersistence) {}

  async execute(request: SignInRequest): Promise<any> {
    new SignInRequestValidation().validate(request);
    const auth = await this.authPersistence.getByUserNameOrNull(request.userName);
    if (!auth) throw new BadRequestException(ExceptionCodeEnum.INVALID_LOGIN);
    if (!(await bcrypt.compare(request.password, auth.password))) throw new BadRequestException(ExceptionCodeEnum.INVALID_LOGIN);
    const token = jwt.sign({ userId: auth.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
}
