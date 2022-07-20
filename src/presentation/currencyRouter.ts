import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { CreateRequest } from '../core/currency/useCases/create/CreateRequest';
import { CreateUseCase } from '../core/currency/useCases/create/CreateUseCase';
import { UpdateRequest } from '../core/currency/useCases/update/UpdateRequest';
import { UpdateUseCase } from '../core/currency/useCases/update/UpdateUseCase';
import { SetExchangeRatesRequest } from '../core/currency/useCases/setExchangeRates/SetExchangeRatesRequest';
import { SetExchangeRatesUseCase } from '../core/currency/useCases/setExchangeRates/SetExchangeRatesUseCase';
import { GetAllActiveUseCase } from '../core/currency/useCases/getAllActive/GetAllActiveUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const currencyPersistence = dependencyInjector.getCurrencyPersistence();

const requestValidatorService = new RequestValidatorService();

router.put('/exchange-rates', async (req: Request, res: Response) => {
  await requestValidatorService.responseWrapper(async () => {
    // req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new SetExchangeRatesUseCase(currencyPersistence).execute(new SetExchangeRatesRequest(req.body));
  }, res);
});

router.get('/active', async (req: Request, res: Response) => {
  await requestValidatorService.responseWrapper(async () => {
    // req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new GetAllActiveUseCase(currencyPersistence).execute();
  }, res);
});

router.put('/', async (req: Request, res: Response) => {
  await requestValidatorService.responseWrapper(async () => {
    // req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new UpdateUseCase(currencyPersistence).execute(new UpdateRequest(req.body));
  }, res);
});

router.post('/', async (req: Request, res: Response) => {
  await requestValidatorService.responseWrapper(async () => {
    // req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new CreateUseCase(currencyPersistence).execute(new CreateRequest(req.body));
  }, res);
});

export const currencyRouter = router;
