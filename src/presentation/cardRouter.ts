import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { CreateRequest } from '../core/card/useCases/create/CreateRequest';
import { CreateUseCase } from '../core/card/useCases/create/CreateUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const cardPersistence = dependencyInjector.getCardPersistence();
const accountPersistence = dependencyInjector.getAccountPersistence();
const cardService = dependencyInjector.getCardService();

const requestValidatorService = new RequestValidatorService();

router.post('/', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new CreateUseCase(cardPersistence, accountPersistence, cardService).execute(new CreateRequest(req.body));
  }, res);
});

export const cardRouter = router;
