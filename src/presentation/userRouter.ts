import { Request, Response, Router } from 'express';
import { RequestValidatorService } from '../core/validation/RequestValidatorService';
import { SignUpUseCase } from '../core/user/useCases/signUp/SignUpUseCase';
import { SignUpRequest } from '../core/user/useCases/signUp/SignUpRequest';
import { DependencyInjector } from '../external/dependencyInjector/DependencyInjector';

const router = Router();

const dependencyInjector = new DependencyInjector();
const userPersistence = dependencyInjector.getUserPersistence();

router.post('/sign-up', async (req: Request, res: Response) => {
  await new RequestValidatorService().responseWrapper(async () => {
    await new SignUpUseCase(userPersistence).execute(new SignUpRequest(req.body));
  }, res);
});

export const userRouter = router;
