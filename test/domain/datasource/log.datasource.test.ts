import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import {
  LogEntity,
  LogSeveretyLevel,
} from '../../../src/domain/entyties/log.entity';

describe('Test log.datasource.ts LogDataSource', () => {
  const newLog = new LogEntity({
    level: LogSeveretyLevel.low,
    message: 'test message from log.datasource.test.ts',
    origin: 'log.datasource.test.ts',
    createdAt: new Date(),
  });

  class MockLogDataSource extends LogDataSource {
    async savedLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('Should test the abstract class', async () => {
    const mockLogDataSource = new MockLogDataSource();

    await mockLogDataSource.savedLog(newLog);
    const logs = await mockLogDataSource.getLogs(LogSeveretyLevel.low);

    expect(mockLogDataSource).toBeInstanceOf(LogDataSource);
    expect(mockLogDataSource).toHaveProperty('savedLog');
    expect(mockLogDataSource).toHaveProperty('getLogs');

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs[0]).toEqual(
      expect.objectContaining({
        level: LogSeveretyLevel.low,
        message: newLog.message,
        origin: newLog.origin,
      })
    );
  });
});
