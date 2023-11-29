import { LogEntity, LogSeveretyLevel } from '../../entyties/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

const origin = 'check-service-multiple.ts';

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack
  ) {}

  private callLogRepositories(log: LogEntity) {
    if (!this.logRepositories.length) {
      return;
    }

    for (const logRepository of this.logRepositories) {
      logRepository.savedLog(log);
    }
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`${url}`);
      }

      const options = {
        level: LogSeveretyLevel.low,
        message: `Service ${url} working`,
        origin,
        createdAt: new Date(),
      };

      const log = new LogEntity(options);
      this.callLogRepositories(log);
      this.successCallBack?.();

      return true;
    } catch (error) {
      const errorMessage = `${url} in not working. ${error}`;
      const options = {
        level: LogSeveretyLevel.high,
        message: errorMessage,
        origin,
        createdAt: new Date(),
      };

      const log = new LogEntity(options);
      this.callLogRepositories;
      this.errorCallBack?.(`${error}`);

      return false;
    }
  }
}
