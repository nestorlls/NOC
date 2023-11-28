export enum LogSeveretyLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public level: LogSeveretyLevel; // enum
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeveretyLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);
    const log = new LogEntity(level, message);
    log.createdAt = new Date(createdAt);
    return log;
  }
}
