import { LogModel } from '../../data/mongo';
import { LogDataSource, LogEntity, LogSeveretyLevel } from '../../domain';

export class MongoLogDataSource implements LogDataSource {
  async savedLog(log: LogEntity): Promise<void> {
    await LogModel.create(log);
  }
  async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severetyLever });
    return logs.map(LogEntity.fromObject);
  }
}
