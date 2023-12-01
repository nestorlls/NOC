import { CronService } from '../../../src/presentation/cron/cron-service';

describe('Test cron-service.ts CronService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  const mockTick = jest.fn();

  test('Should create a job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });

  test('Should create a job', (done) => {
    const createJobSpy = jest.spyOn(CronService, 'createJob');
    const cronTime = '* * * * * *';

    const job = CronService.createJob(cronTime, mockTick);

    setTimeout(() => {
      expect(createJobSpy).toHaveBeenCalledWith(cronTime, mockTick);
      expect(createJobSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Function)
      );
      job.stop();
      done();
    }, 1000);
  });
});
