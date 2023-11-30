import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeveretyLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

const origin = 'send-email-logs.ts';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!send) {
        throw new Error('Email not sent');
      }

      const log = new LogEntity({
        level: LogSeveretyLevel.low,
        message: `Email sent: ${to}`,
        origin,
      });

      this.logRepository.savedLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeveretyLevel.high,
        message: 'Email not sent',
        origin,
      });

      this.logRepository.savedLog(log);

      return false;
    }
  }
}
