import { IUserPersistence } from '../../core/user/IUserPersistence';
import { MongoDbUserPersistence } from '../../persistence/mongoDb/MongoDbUserPersistence';

export class DependencyInjector {
  // Persistences
  getUserPersistence(): IUserPersistence {
    try {
      return new MongoDbUserPersistence();
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
