import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { CreateRequest } from '../core/card/useCases/create/CreateRequest';
import { CreateUseCase } from '../core/card/useCases/create/CreateUseCase';

import { PaymentRequest } from '../core/card/useCases/payment/PaymentRequest';
import { PaymentUseCase } from '../core/card/useCases/payment/PaymentUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const cardPersistence = dependencyInjector.getCardPersistence();
const userPersistence = dependencyInjector.getUserPersistence();
const accountPersistence = dependencyInjector.getAccountPersistence();
const operationPersistence = dependencyInjector.getOperationPersistence();
const cardService = dependencyInjector.getCardService();

const requestValidatorService = new RequestValidatorService();

router.post('/payments', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    await new PaymentUseCase(accountPersistence, cardPersistence, userPersistence, operationPersistence).execute(new PaymentRequest(req.body));
  }, res);
});

router.post('/', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new CreateUseCase(cardPersistence, accountPersistence, cardService).execute(new CreateRequest(req.body));
  }, res);
});

export const cardRouter = router;
