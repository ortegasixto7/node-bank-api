import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { DepositRequest } from '../core/operation/useCases/deposit/DepositRequest';
import { DepositUseCase } from '../core/operation/useCases/deposit/DepositUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const userPersistence = dependencyInjector.getUserPersistence();
const operationPersistence = dependencyInjector.getOperationPersistence();

const requestValidatorService = new RequestValidatorService();

router.post('/deposit', async (req: Request, res: Response) => {
  await requestValidatorService.responseWrapper(async () => {
    req.body.userId = await requestValidatorService.verifyToken(req.headers.authorization);
    return await new DepositUseCase(operationPersistence, userPersistence).execute(new DepositRequest(req.body));
  }, res);
});

export const operationRouter = router;
