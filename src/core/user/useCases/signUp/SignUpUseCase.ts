import { IUseCaseCommand } from '../../../IUseCase';
import { SignUpRequest } from './SignUpRequest';
import { IUserPersistence } from '../../IUserPersistence';
import { IAuthPersistence } from '../../../../external/auth/IAuthPersistence';
import { User } from '../../User';
import { SignUpRequestRequestValidation } from './SignUpRequestValidation';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Auth } from '../../../../external/auth/Auth';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class SignUpUseCase implements IUseCaseCommand<SignUpRequest> {
  constructor(private userPersistence: IUserPersistence, private authPersistence: IAuthPersistence) {}

  async execute(request: SignUpRequest): Promise<void> {
    new SignUpRequestRequestValidation().validate(request);
    let auth = await this.authPersistence.getByUserNameOrNull(request.userName);
    if (auth) throw new BadRequestException(ExceptionCodeEnum.UNAVAILABLE_USER_NAME);
    auth = new Auth();
    auth.id = randomUUID();
    auth.password = await bcrypt.hash(request.password, 10);
    auth.userName = request.userName.toLowerCase();

    const user = new User();
    user.id = auth.id;
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.userName = request.userName.toLowerCase();

    await Promise.all([this.authPersistence.create(auth), this.userPersistence.create(user)]);
  }
}
