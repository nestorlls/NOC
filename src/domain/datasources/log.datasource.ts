import { LogEntity, LogSeveretyLevel } from '../entities/log.entity';

export abstract class LogDataSource {
  abstract savedLog(log: LogEntity): Promise<void>;
  abstract getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]>;
}
