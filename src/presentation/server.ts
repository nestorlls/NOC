import { CheckServiceMultiple, SendEmailLogs } from '../domain';
import {
  FileSystemDataSource,
  LogRepositoruyImpl,
  MongoLogDataSource,
  PostgresDataSource,
} from '../infrastructure';

import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoruyImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoruyImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoruyImpl(new PostgresDataSource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started');

    // todo: send email
    new SendEmailLogs(emailService, fsLogRepository).execute([
      'llanquepol@gmail.com',
    ]);

    emailService.sendEmailWithFileSystemLogs(['llanquepol@gmail.com']);

    // todo: cron -- inyect repositorys - use case
    CronService.createJob('*/25 * * * * *', () => {
      const url = 'https://www.google.com';
      // const url = 'http://localhost:3000';
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`Success: ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
