import fs from 'fs';

import { LogEntity, LogSeveretyLevel } from '../../../src/domain';
import { FileSystemDataSource } from '../../../src/infrastructure/datasources/file-system.datasource';
import path from 'path';

describe('Test file-system.datasource.ts FileSystemDataSource', () => {
  const logsPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logsPath, { recursive: true, force: true });
    fs.mkdirSync(logsPath);
  });

  const log_low = new LogEntity({
    level: LogSeveretyLevel.low,
    message: 'test message low from file-system.datasource.ts',
    origin: 'file-system.datasource.test.ts',
  });
  const log_medium = new LogEntity({
    level: LogSeveretyLevel.medium,
    message: 'test message medium from file-system.datasource.ts',
    origin: 'file-system.datasource.test.ts',
  });
  const log_high = new LogEntity({
    level: LogSeveretyLevel.high,
    message: 'test message high from file-system.datasource.ts',
    origin: 'file-system.datasource.test.ts',
  });

  it('should create log files if they do not exists', () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logsPath);

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
  });

  test('Should saved log in logs-all.log', async () => {
    const fileSystemDataSource = new FileSystemDataSource();
    await fileSystemDataSource.savedLog(log_low);

    const logs = fs.readFileSync(`${logsPath}/logs-all.log`, 'utf-8');

    expect(logs).toContain(JSON.stringify(log_low));
  });

  test('Should saved log in logs-all.log and logs-medium.log', async () => {
    const fileSystemDataSource = new FileSystemDataSource();
    await fileSystemDataSource.savedLog(log_low);
    await fileSystemDataSource.savedLog(log_medium);

    const lowLogs = fs.readFileSync(`${logsPath}/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logsPath}/logs-medium.log`, 'utf-8');

    expect(lowLogs).toContain(JSON.stringify(log_low));
    expect(mediumLogs).toContain(JSON.stringify(log_medium));
  });

  test('Should saved log in logs-all.log and logs-high.log', async () => {
    const fileSystemDataSource = new FileSystemDataSource();
    await fileSystemDataSource.savedLog(log_low);
    await fileSystemDataSource.savedLog(log_high);

    const lowLogs = fs.readFileSync(`${logsPath}/logs-all.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logsPath}/logs-high.log`, 'utf-8');

    expect(lowLogs).toContain(JSON.stringify(log_low));
    expect(highLogs).toContain(JSON.stringify(log_high));
  });

  test('Should get all logs', async () => {
    const fileSystemDataSource = new FileSystemDataSource();
    await fileSystemDataSource.savedLog(log_low);
    await fileSystemDataSource.savedLog(log_medium);
    await fileSystemDataSource.savedLog(log_high);

    const logs_low = await fileSystemDataSource.getLogs(LogSeveretyLevel.low);
    const logs_medium = await fileSystemDataSource.getLogs(
      LogSeveretyLevel.medium
    );
    const logs_high = await fileSystemDataSource.getLogs(LogSeveretyLevel.high);

    expect(logs_low).toEqual(
      expect.arrayContaining([log_low, log_medium, log_high])
    );
    expect(logs_medium).toEqual(expect.arrayContaining([log_medium]));
    expect(logs_high).toEqual(expect.arrayContaining([log_high]));
  });

  test('Should not throw error if logs not exists', async () => {
    const fileSystemDataSource = new FileSystemDataSource();
    const logs = await fileSystemDataSource.getLogs(LogSeveretyLevel.low);

    expect(logs).toEqual([]);
  });

  test('Should throw an error if severetyLevel is not implemented', async () => {
    const fileSystemDataSource = new FileSystemDataSource();

    await expect(
      fileSystemDataSource.getLogs(
        LogSeveretyLevel as unknown as LogSeveretyLevel
      )
    ).rejects.toThrow();
  });
});
