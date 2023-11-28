import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoruyImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoruyImpl(
  new FileSystemDataSource()
  // new PostgreSQLDataSource()
  // new MongoDBDataSource()
);

export class Server {
  public static start() {
    console.log('Server started');

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
