import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { CreateRequest } from '../core/account/useCases/create/CreateRequest';
import { CreateUseCase } from '../core/account/useCases/create/CreateUseCase';
import { GetAllRequest } from '../core/account/useCases/getAll/GetAllRequest';
import { GetAllUseCase } from '../core/account/useCases/getAll/GetAllUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const accountPersistence = dependencyInjector.getAccountPersistence();
const currencyPersistence = dependencyInjector.getCurrencyPersistence();
const userPersistence = dependencyInjector.getUserPersistence();

const requestValidatorService = new RequestValidatorService();

router.get('/', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new GetAllUseCase(accountPersistence).execute(new GetAllRequest(req.body));
  }, res);
});

router.post('/', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new CreateUseCase(accountPersistence, currencyPersistence, userPersistence).execute(new CreateRequest(req.body));
  }, res);
});

export const accountRouter = router;
