import { LogEntity, LogSeveretyLevel } from '../entyties/log.entity';

export abstract class LogRepository {
  abstract savedLog(log: LogEntity): Promise<void>;
  abstract getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]>;
}
