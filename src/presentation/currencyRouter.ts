import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { CreateRequest } from '../core/currency/useCases/create/CreateRequest';
import { CreateUseCase } from '../core/currency/useCases/create/CreateUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const currencyPersistence = dependencyInjector.getCurrencyPersistence();

const requestValidatorService = new RequestValidatorService();

router.post('/', async (req: Request, res: Response) => {
  await requestValidatorService.responseWrapper(async () => {
    // req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new CreateUseCase(currencyPersistence).execute(new CreateRequest(req.body));
  }, res);
});

export const currencyRouter = router;
