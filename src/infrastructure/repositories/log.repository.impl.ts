import {
  LogDataSource,
  LogEntity,
  LogRepository,
  LogSeveretyLevel,
} from '../../domain';

export class LogRepositoruyImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async savedLog(log: LogEntity): Promise<void> {
    return await this.logDataSource.savedLog(log);
  }

  async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
    return await this.logDataSource.getLogs(severetyLever);
  }
}
