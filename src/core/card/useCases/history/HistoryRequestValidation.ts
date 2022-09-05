import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { HistoryRequest } from './HistoryRequest';

export class HistoryRequestValidation implements IRequestValidator<HistoryRequest> {
  validate(request: HistoryRequest): void {
    if (!request.cardId) throw new BadRequestException(ExceptionCodeEnum.CARD_ID_IS_REQUIRED);
  }
}
