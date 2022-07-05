import { IUseCaseCommand } from '../../../IUseCase';
import { SignUpRequest } from './SignUpRequest';
import { IUserPersistence } from '../../IUserPersistence';
import { User, UserRoleEnum } from '../../User';
import { SignUpRequestRequestValidation } from './SignUpRequestValidation';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

export class SignUpUseCase implements IUseCaseCommand<SignUpRequest> {
  constructor(private userPersistence: IUserPersistence) {}

  async execute(request: SignUpRequest): Promise<void> {
    new SignUpRequestRequestValidation().validate(request);
    const user = new User();
    user.balance = 0;
    user.id = randomUUID();
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.password = await bcrypt.hash(request.password, 10);
    user.role = UserRoleEnum.CLASSIC;
    user.userName = request.userName;

    await this.userPersistence.create(user);
  }
}
