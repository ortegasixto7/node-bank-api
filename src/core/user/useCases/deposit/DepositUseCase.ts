import { IUseCaseCommand } from '../../../IUseCase';
import { DepositRequest } from './DepositRequest';
import { IUserPersistence } from '../../../user/IUserPersistence';
import { DepositRequestValidation } from './DepositRequestValidation';

export class DepositUseCase implements IUseCaseCommand<DepositRequest> {
  constructor(private userPersistence: IUserPersistence) {}

  async execute(request: DepositRequest): Promise<void> {
    new DepositRequestValidation().validate(request);
    const user = await this.userPersistence.getByIdOrException(request.userId);
    user.balance += request.amount;
    await this.userPersistence.update(user);
  }
}
