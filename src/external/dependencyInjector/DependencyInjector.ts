import { IUserPersistence } from '../../core/user/IUserPersistence';
import { IOperationPersistence } from '../../core/operation/IOperationPersistence';
import { ICurrencyPersistence } from '../../core/currency/ICurrencyPersistence';
import { IAccountPersistence } from '../../core/account/IAccountPersistence';
import { MongoDbUserPersistence } from '../../persistence/mongoDb/MongoDbUserPersistence';
import { MongoDbAuthPersistence } from '../../persistence/mongoDb/MongoDbAuthPersistence';
import { MongoDbOperationPersistence } from '../../persistence/mongoDb/MongoDbOperationPersistence';
import { MongoDbCurrencyPersistence } from '../../persistence/mongoDb/MongoDbCurrencyPersistence';
import { MongoDbAccountPersistence } from '../../persistence/mongoDb/MongoDbAccountPersistence';
import { MongoDbCardPersistence } from '../../persistence/mongoDb/MongoDbCardPersistence';
import { CardService } from '../../core/card/CardService';
import { ICardService } from '../../core/card/ICardService';
import { IAuthPersistence } from '../auth/IAuthPersistence';
import { ICardPersistence } from '../../core/card/ICardPersistence';

export class DependencyInjector {
  // Persistences
  getUserPersistence(): IUserPersistence {
    return new MongoDbUserPersistence();
  }
  getAuthPersistence(): IAuthPersistence {
    return new MongoDbAuthPersistence();
  }
  getOperationPersistence(): IOperationPersistence {
    return new MongoDbOperationPersistence();
  }
  getCurrencyPersistence(): ICurrencyPersistence {
    return new MongoDbCurrencyPersistence();
  }
  getAccountPersistence(): IAccountPersistence {
    return new MongoDbAccountPersistence();
  }
  getCardPersistence(): ICardPersistence {
    return new MongoDbCardPersistence();
  }

  // Services
  getCardService(): ICardService {
    return new CardService();
  }
}
