import { IUseCaseCommand } from '../../../IUseCase';
import { UpdateRequest } from './UpdateRequest';
import { ICurrencyPersistence } from '../../../currency/ICurrencyPersistence';
import { CreateRequestValidation } from '../create/CreateRequestValidation';

export class UpdateUseCase implements IUseCaseCommand<UpdateRequest> {
  constructor(private currencyPersistence: ICurrencyPersistence) {}

  async execute(request: UpdateRequest): Promise<void> {
    new CreateRequestValidation().validate(request);

    const currency = await this.currencyPersistence.getByCodeOrException(request.code);
    currency.code = request.code;
    currency.symbol = request.symbol;
    currency.name = request.name;
    currency.exchangeRates = request.exchangeRates;

    await this.currencyPersistence.update(currency);
  }
}
