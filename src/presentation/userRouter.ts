import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { SignUpUseCase } from '../core/user/useCases/signUp/SignUpUseCase';
import { SignUpRequest } from '../core/user/useCases/signUp/SignUpRequest';
import { SignInRequest } from '../core/user/useCases/signIn/SignInRequest';
import { SignInUseCase } from '../core/user/useCases/signIn/SignInUseCase';
import { DepositRequest } from '../core/user/useCases/deposit/DepositRequest';
import { DepositUseCase } from '../core/user/useCases/deposit/DepositUseCase';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const userPersistence = dependencyInjector.getUserPersistence();
const authPersistence = dependencyInjector.getAuthPersistence();

router.post('/deposit', async (req: Request, res: Response) => {
  await new RequestValidatorService().responseWrapper(async () => {
    return await new DepositUseCase(userPersistence).execute(new DepositRequest(req.body));
  }, res);
});

router.post('/sign-in', async (req: Request, res: Response) => {
  await new RequestValidatorService().responseWrapper(async () => {
    return await new SignInUseCase(authPersistence).execute(new SignInRequest(req.body));
  }, res);
});

router.post('/sign-up', async (req: Request, res: Response) => {
  await new RequestValidatorService().responseWrapper(async () => {
    await new SignUpUseCase(userPersistence, authPersistence).execute(new SignUpRequest(req.body));
  }, res);
});

export const userRouter = router;
