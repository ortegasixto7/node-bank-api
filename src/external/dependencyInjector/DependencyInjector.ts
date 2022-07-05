import { IUserPersistence } from '../../core/user/IUserPersistence';
import { MongoDbClient } from '../../persistence/mongoDb/MongoDbClient';
import { MongoDbUserPersistence } from '../../persistence/mongoDb/MongoDbUserPersistence';

export class DependencyInjector {
  // Persistences
  getUserPersistence(): IUserPersistence {
    try {
      return new MongoDbUserPersistence(MongoDbClient.db);
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
