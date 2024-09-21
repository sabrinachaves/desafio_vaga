import path from 'path';
import { ConnectOptions } from 'mongoose';

import { AppConfig } from '../../../config/AppConfig';
import Database from '../../persistence/Database';
import { IDatabase } from '../../persistence/IDatabase';

const rdsCombinedCaCertificatePath = path.resolve(__dirname, '..', '..', '..', '..', 'certificates');
export default class DatabaseFactory {
  private static database: IDatabase;

  static async make() {
    if (this.database) {
      return this.database;
    }

    let options: ConnectOptions = {
      dbName: AppConfig.MONGO_DB_NAME,
      appName: AppConfig.APPLICATION_NAME,
      retryWrites: false,
    };

    if (AppConfig.APP_ENVIRONMENT !== 'development') {
      options = {
        ...options,
        user: AppConfig.MONGO_USER,
        pass: AppConfig.MONGO_PASSWORD,
        tls: true,
        tlsCAFile: `${rdsCombinedCaCertificatePath}/rds-combined-ca-bundle.pem`,
      };
    }

    this.database = new Database(AppConfig.MONGO_URI, options);

    return this.database;
  }
}
