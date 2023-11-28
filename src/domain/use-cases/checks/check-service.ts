import { LogEntity, LogSeveretyLevel } from '../../entyties/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

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
      const log = new LogEntity(LogSeveretyLevel.low, `Service ${url} working`);
      this.logRepository.savedLog(log);
      this.successCallBack?.();

      return true;
    } catch (error) {
      const errorMessage = `${url} in not working. ${error}`;
      const log = new LogEntity(LogSeveretyLevel.high, errorMessage);
      this.logRepository.savedLog(log);
      this.errorCallBack?.(`${error}`);

      return false;
    }
  }
}
