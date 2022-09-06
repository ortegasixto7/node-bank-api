import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { DepositRequest } from '../core/operation/useCases/deposit/DepositRequest';
import { DepositUseCase } from '../core/operation/useCases/deposit/DepositUseCase';
import { WithdrawRequest } from '../core/operation/useCases/withdraw/WithdrawRequest';
import { WithdrawUseCase } from '../core/operation/useCases/withdraw/WithdrawUseCase';
import { CurrencyConverterRequest } from '../core/operation/useCases/currencyConverter/CurrencyConverterRequest';
import { CurrencyConverterUseCase } from '../core/operation/useCases/currencyConverter/CurrencyConverterUseCase';
import { InternalTransferRequest } from '../core/operation/useCases/internalTransfer/InternalTransferRequest';
import { InternalTransferUseCase } from '../core/operation/useCases/internalTransfer/InternalTransferUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const userPersistence = dependencyInjector.getUserPersistence();
const operationPersistence = dependencyInjector.getOperationPersistence();
const accountPersistence = dependencyInjector.getAccountPersistence();
const currencyPersistence = dependencyInjector.getCurrencyPersistence();

const requestValidatorService = new RequestValidatorService();

router.post('/convert', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new CurrencyConverterUseCase(operationPersistence, userPersistence, accountPersistence, currencyPersistence).execute(
      new CurrencyConverterRequest(req.body)
    );
  }, res);
});

router.post('/internal-transfer', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new InternalTransferUseCase(operationPersistence, userPersistence, accountPersistence).execute(new InternalTransferRequest(req.body));
  }, res);
});

router.post('/withdraw', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new WithdrawUseCase(operationPersistence, userPersistence, accountPersistence).execute(new WithdrawRequest(req.body));
  }, res);
});

router.post('/deposit', async (req: Request, res: Response) => {
  await requestValidatorService.wrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    await new DepositUseCase(operationPersistence, userPersistence, accountPersistence).execute(new DepositRequest(req.body));
  }, res);
});

export const operationRouter = router;
