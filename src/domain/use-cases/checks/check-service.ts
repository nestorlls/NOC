import { LogEntity, LogSeveretyLevel } from '../../entyties/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

const origin = 'check-service.ts';

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack
  ) {}

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
      this.logRepository.savedLog(log);
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
      this.logRepository.savedLog(log);
      this.errorCallBack?.(`${error}`);

      return false;
    }
  }
}
