import { LogEntity, LogSeveretyLevel } from '../entities/log.entity';

export abstract class LogRepository {
  abstract savedLog(log: LogEntity): Promise<void>;
  abstract getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]>;
}
