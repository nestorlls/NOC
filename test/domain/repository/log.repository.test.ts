import {
  LogEntity,
  LogSeveretyLevel,
} from '../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../src/domain/repository/log.repository';

describe('Test log.repository.ts LogRepository', () => {
  const newLog = new LogEntity({
    level: LogSeveretyLevel.low,
    message: 'test message from log.datasource.test.ts',
    origin: 'log.datasource.test.ts',
    createdAt: new Date(),
  });

  class MockLogRepository extends LogRepository {
    async savedLog(log: LogEntity): Promise<void> {
      return Promise.resolve();
    }
    async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
      return Promise.resolve([newLog]);
    }
  }
  test('Should test the abstract class and methods', async () => {
    const mockLogRepository = new MockLogRepository();

    await mockLogRepository.savedLog(newLog);
    const logs = await mockLogRepository.getLogs(LogSeveretyLevel.low);

    expect(mockLogRepository).toBeInstanceOf(LogRepository);
    expect(mockLogRepository).toHaveProperty('savedLog');
    expect(mockLogRepository).toHaveProperty('getLogs');

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
