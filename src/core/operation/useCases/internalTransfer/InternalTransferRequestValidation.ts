import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { InternalTransferRequest } from './InternalTransferRequest';

export class InternalTransferRequestValidation implements IRequestValidator<InternalTransferRequest> {
  validate(request: InternalTransferRequest): void {
    if (request.amount < 1) throw new BadRequestException(ExceptionCodeEnum.AMOUNT_NEEDS_TO_BE_GREATER_THAN_ZERO);
    if (!request.currencyCode) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_CODE_IS_REQUIRED);
    if (!request.recipientAccountNumber) throw new BadRequestException(ExceptionCodeEnum.RECIPIENT_ACCOUNT_NUMBER_IS_REQUIRED);
  }
}
