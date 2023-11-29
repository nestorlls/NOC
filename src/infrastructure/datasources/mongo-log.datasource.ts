import { LogModel } from '../../data/mongo';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeveretyLevel } from '../../domain/entyties/log.entity';

export class MongoLogDataSource implements LogDataSource {
  async savedLog(log: LogEntity): Promise<void> {
    await LogModel.create(log);
  }
  async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severetyLever });
    return logs.map(LogEntity.fromObject);
  }
}
