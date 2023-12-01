import {
  LogDataSource,
  LogEntity,
  LogSeveretyLevel,
} from '../../../src/domain';
import { LogRepositoruyImpl } from '../../../src/infrastructure/repositories/log.repository.impl';

describe('Test log.repository.impl.ts LogRepositoryImpl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockLogDatasource: LogDataSource = {
    savedLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const log = new LogEntity({
    level: LogSeveretyLevel.low,
    message: 'test message from log.repository.impl.ts',
    origin: 'log.repository.impl.ts',
  });

  const logRepositoryImpl = new LogRepositoruyImpl(mockLogDatasource);
  test('savedLogs should call the database whit arguments', async () => {
    const savedLogSpy = jest.spyOn(mockLogDatasource, 'savedLog');

    await logRepositoryImpl.savedLog(log);

    expect(savedLogSpy).toHaveBeenCalled();
    expect(savedLogSpy).toHaveBeenCalledWith(log);
    expect(mockLogDatasource.savedLog).toHaveBeenCalledWith(log);
  });

  test('getLogs should call the database whit arguments', async () => {
    const getLogsSpy = jest.spyOn(mockLogDatasource, 'getLogs');

    await logRepositoryImpl.getLogs(LogSeveretyLevel.low);

    expect(getLogsSpy).toHaveBeenCalled();
    expect(getLogsSpy).toHaveBeenCalledWith(LogSeveretyLevel.low);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(
      LogSeveretyLevel.low
    );
  });
});
