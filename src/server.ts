import compression from 'compression';
import cors from 'cors';
import express, { Response, Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { PORT } from './config/config';
import { MongoDbClient } from './persistence/mongoDb/MongoDbClient';
import { userRouter } from './presentation/userRouter';
import { operationRouter } from './presentation/operationRouter';
import { currencyRouter } from './presentation/currencyRouter';
import { accountRouter } from './presentation/accountRouter';
import { cardRouter } from './presentation/cardRouter';

MongoDbClient.getInstance().catch((err) => console.error(err));

const app = express();
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(function (req, _, next) {
  console.info(`REQUEST_BODY: ${JSON.stringify(req.body)}`);
  next();
});

const router = Router();

router.get('/', (_, res: Response) => {
  res.status(200).json({ msg: 'API is working' });
});

router.use('/users', userRouter);
router.use('/operations', operationRouter);
router.use('/currencies', currencyRouter);
router.use('/accounts', accountRouter);
router.use('/cards', cardRouter);

app.use(router);
app.listen(PORT, () => {
  console.log(`-------\n App listening on port => ${PORT}\n-------`);
});
