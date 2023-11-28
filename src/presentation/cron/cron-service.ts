import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: OnTick) {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}
