import { connect, ConnectOptions } from 'mongoose';

import { IDatabase } from './IDatabase';

export default class Database implements IDatabase {
  private uri: string;
  private options: ConnectOptions;

  constructor(uri: string, options: ConnectOptions) {
    this.uri = uri;
    this.options = options;
  }

  async connect(): Promise<void> {
    try {
      const connectionMongoDb = await connect(this.uri, this.options);

      console.log('Database connected');

      connectionMongoDb.connection.on('error', () => {
        console.error('Error on database connection');
        throw new Error('Error on database connection');
      });

      connectionMongoDb.connection.on('disconnected', () => {
        console.error('Database disconnected');
        throw new Error('Database disconnected');
      });
    } catch (error) {
      console.error(`Failed to connect on database with error: ${error}. Connection name: ${this.options.appName}`);
      throw error;
    }
  }
}
