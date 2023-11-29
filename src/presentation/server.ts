import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoruyImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoruyImpl(
  new FileSystemDataSource()
  // new PostgreSQLDataSource()
  // new MongoDBDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started');

    // todo: send email
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      'llanquepol@gmail.com',
    ]);

    emailService.sendEmailWithFileSystemLogs(['llanquepol@gmail.com']);

    CronService.createJob('*/5 * * * * *', () => {
      // const url = 'https://www.google.com';
      const url = 'http://localhost:3000';
      new CheckService(
        fileSystemLogRepository,
        undefined,
        undefined
        // () => console.log(`Success: ${url}`),
        // (error) => console.log(error)
      ).execute(url);
    });
  }
}
