import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { CreateRequest } from '../core/account/useCases/create/CreateRequest';
import { CreateUseCase } from '../core/account/useCases/create/CreateUseCase';
import { CreateTokenRequest } from '../core/account/useCases/createToken/CreateTokenRequest';
import { CreateTokenUseCase } from '../core/account/useCases/createToken/CreateTokenUseCase';
import { GetAllRequest } from '../core/account/useCases/getAll/GetAllRequest';
import { GetAllUseCase } from '../core/account/useCases/getAll/GetAllUseCase';
import { GetRequest } from '../core/account/useCases/get/GetRequest';
import { GetUseCase } from '../core/account/useCases/get/GetUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const accountPersistence = dependencyInjector.getAccountPersistence();
const currencyPersistence = dependencyInjector.getCurrencyPersistence();
const userPersistence = dependencyInjector.getUserPersistence();

const requestValidatorService = new RequestValidatorService();

router.post('/tokens', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new CreateTokenUseCase(accountPersistence).execute(new CreateTokenRequest(req.body));
  }, res);
});

router.get('/:code', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    req.body.currencyCode = req.params.code;
    return await new GetUseCase(accountPersistence).execute(new GetRequest(req.body));
  }, res);
});

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
