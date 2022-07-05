import { IUseCaseCommand } from '../../../IUseCase';
import { SignUpRequest } from './SignUpRequest';
import { IUserPersistence } from '../../IUserPersistence';
import { User, UserRoleEnum } from '../../User';
import { SignUpRequestRequestValidation } from './SignUpRequestValidation';

export class SignUpUseCase implements IUseCaseCommand<SignUpRequest> {
  constructor(private userPersistence: IUserPersistence) {}

  async execute(request: SignUpRequest): Promise<void> {
    new SignUpRequestRequestValidation().validate(request);
    const user = new User();
    user.balance = 0;
    user.id = 'Id';
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.password = request.password;
    user.role = UserRoleEnum.CLASSIC;
    user.userName = request.userName;

    await this.userPersistence.create(user);
  }
}
