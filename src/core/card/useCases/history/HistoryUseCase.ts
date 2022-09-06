import { HistoryRequest } from './HistoryRequest';
import { HistoryRequestValidation } from './HistoryRequestValidation';
import { HistoryResponse } from './HistoryResponse';
import { IUseCaseQuery } from '../../../IUseCase';
import { IOperationPersistence } from '../../../operation/IOperationPersistence';
import { ICardPersistence } from '../../ICardPersistence';

export class HistoryUseCase implements IUseCaseQuery<HistoryRequest> {
  constructor(private readonly cardPersistence: ICardPersistence, private readonly operationPersistence: IOperationPersistence) {}

  async execute(request: HistoryRequest): Promise<any> {
    new HistoryRequestValidation().validate(request);
    const card = await this.cardPersistence.getByCardIdAndUserIdOrException(request.cardId, request.userId);
    const data = await this.operationPersistence.getAllByCardId(card.id);
    const result: HistoryResponse[] = [];
    data.map((item) => {
      const history = new HistoryResponse();
      history.amount = item.amount;
      history.commission = item.commission;
      history.createdAt = item.createdAt;
      history.currencyCode = item.currencyCode;
      history.number = item.number;
      history.recipient = item.recipient.userName;
      result.push(history);
    });
    return result;
  }
}
