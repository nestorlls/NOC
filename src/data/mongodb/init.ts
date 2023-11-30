import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  mongoDbName: string;
}

/**
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
  uninitialized: 99
 */
export class MongoDataBase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, mongoDbName } = options;

    try {
      const { STATES } = await mongoose.connect(mongoUrl, {
        dbName: mongoDbName,
      });

      return STATES.connected;
    } catch (error) {
      throw error;
    }
  }
}
