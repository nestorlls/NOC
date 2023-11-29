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
    const { message, level, createdAt, origin }: LogEntityOptions =
      JSON.parse(json);
    return new LogEntity({ level, message, createdAt, origin });
  }
}
