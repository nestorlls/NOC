export enum LogSeveretyLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeveretyLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeveretyLevel; // enum
  public message: string;
  public origin: string;
  public createdAt: Date;

  constructor(options: LogEntityOptions) {
    const {
      level,
      message,
      origin,
      createdAt = new Date(),
    }: LogEntityOptions = options;

    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson(json: string): LogEntity {
    json = json === '' ? '{}' : json;

    const { message, level, createdAt, origin } = JSON.parse(json);
    return new LogEntity({ level, message, createdAt, origin });
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, level, origin, createdAt } = object;
    return new LogEntity({ level, message, origin, createdAt });
  }
}
