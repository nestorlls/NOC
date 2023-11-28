import { LogEntity, LogSeveretyLevel } from '../entyties/log.entity';

export abstract class LogDataSource {
  abstract savedLog(log: LogEntity): Promise<void>;
  abstract getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]>;
}
