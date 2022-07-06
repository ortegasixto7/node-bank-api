import { IUserPersistence } from '../../core/user/IUserPersistence';
import { MongoDbUserPersistence } from '../../persistence/mongoDb/MongoDbUserPersistence';
import { MongoDbAuthPersistence } from '../../persistence/mongoDb/MongoDbAuthPersistence';
import { IAuthPersistence } from '../auth/IAuthPersistence';

export class DependencyInjector {
  // Persistences
  getUserPersistence(): IUserPersistence {
    return new MongoDbUserPersistence();
  }

  getAuthPersistence(): IAuthPersistence {
    return new MongoDbAuthPersistence();
  }
}
