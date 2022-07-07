import { IUserPersistence } from '../../core/user/IUserPersistence';
import { IOperationPersistence } from '../../core/operation/IOperationPersistence';
import { MongoDbUserPersistence } from '../../persistence/mongoDb/MongoDbUserPersistence';
import { MongoDbAuthPersistence } from '../../persistence/mongoDb/MongoDbAuthPersistence';
import { MongoDbOperationPersistence } from '../../persistence/mongoDb/MongoDbOperationPersistence';
import { IAuthPersistence } from '../auth/IAuthPersistence';

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
}
