import { IUseCaseCommand } from '../../../IUseCase';
import { CreateRequest } from './CreateRequest';
import { CreateRequestValidation } from './CreateRequestValidation';
import { ICardPersistence } from '../../ICardPersistence';
import { ICardService } from '../../ICardService';
import { Card } from '../../Card';
import { IAccountPersistence } from '../../../account/IAccountPersistence';
import { BadRequestException } from '../../../validation/exceptions/BadRequestException';
import { ExceptionCodeEnum } from '../../../validation/ExceptionCodeEnum';

export class CreateUseCase implements IUseCaseCommand<CreateRequest> {
  constructor(
    private readonly cardPersistence: ICardPersistence,
    private readonly accountPersistence: IAccountPersistence,
    private readonly cardService: ICardService
  ) {}

  async execute(request: CreateRequest): Promise<void> {
    new CreateRequestValidation().validate(request);
    const card = new Card();
    card.currencyCode = request.currencyCode;
    card.userId = request.userId;
    card.expirationMonth = this.cardService.getExpirationMonth();
    card.expirationYear = this.cardService.getExpirationYear();
    card.isEnabled = true;
    card.number = this.cardService.getNumber();
    card.verificationCode = this.cardService.getVerificationCode();
    card.expirationTimestamp = this.cardService.getExpirationTimestamp(Number(card.expirationYear), Number(card.expirationMonth));

    const cardUserResult = await this.cardPersistence.getByUserIdAndCurrencyCodeOrNull(request.userId, request.currencyCode);
    if (cardUserResult && cardUserResult.expirationTimestamp > Date.now()) {
      throw new BadRequestException(ExceptionCodeEnum.CARD_WITH_CURRENCY_CODE_ALREADY_EXIST);
    }

    let cardNumberExist = true;
    let cardNumberResult: Card | null = null;
    do {
      cardNumberResult = await this.cardPersistence.getByCardNumberOrNull(card.number);
      if (!cardNumberResult) {
        cardNumberExist = false;
      } else {
        card.number = this.cardService.getNumber();
      }
    } while (cardNumberExist);

    const account = await this.accountPersistence.getByUserIdAndCurrencyCodeOrException(request.userId, request.currencyCode);
    account.cardId = card.id;
    card.accountId = account.id;

    await Promise.all([this.cardPersistence.create(card), this.accountPersistence.update(account)]);
  }
}
