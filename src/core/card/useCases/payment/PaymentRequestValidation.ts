import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { IRequestValidator } from '../../../validation/IRequestValidator';
import { PaymentRequest } from './PaymentRequest';

export class PaymentRequestValidation implements IRequestValidator<PaymentRequest> {
  validate(request: PaymentRequest): void {
    if (request.amount < 1) throw new BadRequestException(ExceptionCodeEnum.AMOUNT_NEEDS_TO_BE_GREATER_THAN_ZERO);
    if (!request.cardNumber) throw new BadRequestException(ExceptionCodeEnum.CARD_NUMBER_IS_REQUIRED);
    if (!request.currencyCode) throw new BadRequestException(ExceptionCodeEnum.CURRENCY_CODE_IS_REQUIRED);
    if (!request.expirationMonth) throw new BadRequestException(ExceptionCodeEnum.EXPIRATION_MONTH_IS_REQUIRED);
    if (!request.expirationYear) throw new BadRequestException(ExceptionCodeEnum.EXPIRATION_YEAR_IS_REQUIRED);
    if (!request.verificationCode) throw new BadRequestException(ExceptionCodeEnum.VERIFICATION_CODE_IS_REQUIRED);
    if (!request.receiverAccountToken) throw new BadRequestException(ExceptionCodeEnum.RECEIVER_ACCOUNT_TOKEN_IS_REQUIRED);
  }
}
