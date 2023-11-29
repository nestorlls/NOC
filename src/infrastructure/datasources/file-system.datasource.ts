import fs from 'fs';

import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeveretyLevel } from '../../domain/entyties/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/';
  private readonly AllLogsPaths = 'logs/logs-all.log';
  private readonly mediumLogsPaths = 'logs/logs-medium.log';
  private readonly hightLogsPaths = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.AllLogsPaths, this.mediumLogsPaths, this.hightLogsPaths].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      }
    );
  }

  async savedLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.AllLogsPaths, logAsJson);
    if (newLog.level === LogSeveretyLevel.low) return;
    if (newLog.level === LogSeveretyLevel.medium) {
      fs.appendFileSync(this.mediumLogsPaths, logAsJson);
    } else {
      fs.appendFileSync(this.hightLogsPaths, logAsJson);
    }
  }

  private getLogFromFile(path: string): LogEntity[] {
    const logs = fs.readFileSync(path, 'utf-8');
    if (logs === '') return [];
    return logs.trim().split('\n').map(LogEntity.fromJson);
  }

  async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
    switch (severetyLever) {
      case LogSeveretyLevel.low:
        return this.getLogFromFile(this.AllLogsPaths);
      case LogSeveretyLevel.medium:
        return this.getLogFromFile(this.mediumLogsPaths);
      case LogSeveretyLevel.high:
        return this.getLogFromFile(this.hightLogsPaths);
      default:
        throw new Error(`${severetyLever} not implemented`);
    }
  }
}
