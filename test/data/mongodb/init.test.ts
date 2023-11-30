import mongoose from 'mongoose';
import { MongoDataBase } from '../../../src/data/mongodb/init';

describe('Test MongoDB init.ts', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  test('Should connect correctly', async () => {
    const options = {
      mongoUrl: process.env.MONGO_DB_URL!,
      mongoDbName: process.env.MONGO_DB_NAME!,
    };

    const connected = await MongoDataBase.connect(options);

    expect(connected).toEqual(1);
  });

  test('Should not connect correctly', async () => {
    try {
      const options = {
        mongoUrl: 'mongodb://paul:123456789@localhostDQS:27017',
        mongoDbName: 'NOC-TEST',
      };
      await MongoDataBase.connect(options);

      expect(true).toBeFalsy();
    } catch (error) {}
  });
});
