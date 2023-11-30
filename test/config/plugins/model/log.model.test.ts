import mongoose from 'mongoose';

import { LogModel } from '../../../../src/data/mongodb/models/log.model';
import { envs } from '../../../../src/config/plugins/envs.plugin';
import { MongoDataBase } from '../../../../src/data/mongodb/init';

describe('Test log.model.ts LogModel', () => {
  beforeAll(async () => {
    await MongoDataBase.connect({
      mongoUrl: envs.MONGO_DB_URL,
      mongoDbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('Should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'test message from log.model.test.ts',
      level: 'low',
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test('Should return the schema object of LogModel', () => {
    const schema = LogModel.schema.obj;

    // console.log(schema);

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: String, required: true },
        origin: { type: String },
        level: {
          type: String,
          required: true,
          enum: ['low', 'medium', 'high'],
        },
        createdAt: {
          type: Date,
          default: expect.any(Date),
        },
      })
    );
  });
});
