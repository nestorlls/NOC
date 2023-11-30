import mongoose from 'mongoose';
import { envs } from '../../../src/config/plugins/envs.plugin';
import { LogModel, MongoDataBase } from '../../../src/data/mongodb';
import { LogEntity, LogSeveretyLevel } from '../../../src/domain';
import { MongoLogDataSource } from '../../../src/infrastructure/datasources/mongo-log.datasource';

describe('Test mongo-log.datasource.ts MongoLogDataSource', () => {
  // todo: antes de todo --> realizar conexión a la base de datos
  beforeAll(async () => {
    await MongoDataBase.connect({
      mongoDbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_DB_URL,
    });
  });

  // todo: despues de cada test --> limpiar la base de datos
  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  // todo: despues de todo los test --> cerrar la base de datos
  afterAll(() => {
    mongoose.connection.close();
  });

  // instanciar el datasource
  const mongoLogDataSource = new MongoLogDataSource();
  const newLog = new LogEntity({
    level: LogSeveretyLevel.low,
    message: 'test message from mongo-log.datasource.ts',
    origin: 'mongo-log.datasource.test.ts',
  });

  test('Should create a log', async () => {
    const createSpy = jest.spyOn(LogModel, 'create');

    await mongoLogDataSource.savedLog(newLog);

    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: newLog.level,
      message: newLog.message,
      origin: newLog.origin,
    });
  });

  test('Should get logs', async () => {
    const getSpy = jest.spyOn(LogModel, 'find');
    await mongoLogDataSource.savedLog(newLog);
    await mongoLogDataSource.savedLog(newLog);
    const logs = await mongoLogDataSource.getLogs(LogSeveretyLevel.low);

    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith({ level: LogSeveretyLevel.low });
    expect(logs.length).toBe(2);
  });
});
