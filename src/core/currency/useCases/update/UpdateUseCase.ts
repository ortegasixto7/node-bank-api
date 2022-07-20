import { IUseCaseCommand } from '../../../IUseCase';
import { UpdateRequest } from './UpdateRequest';
import { ICurrencyPersistence } from '../../../currency/ICurrencyPersistence';
import { UpdateRequestValidation } from '../update/UpdateRequestValidation';

export class UpdateUseCase implements IUseCaseCommand<UpdateRequest> {
  constructor(private currencyPersistence: ICurrencyPersistence) {}

  async execute(request: UpdateRequest): Promise<void> {
    new UpdateRequestValidation().validate(request);

    const currency = await this.currencyPersistence.getByCodeOrException(request.code);
    currency.code = request.code;
    currency.symbol = request.symbol;
    currency.name = request.name;
    currency.isActive = request.isActive;

    await this.currencyPersistence.update(currency);
  }
}
