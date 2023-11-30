import {
  LogEntity,
  LogSeveretyLevel,
} from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';

describe('Test send-email-logs.ts SendEmailLogs', () => {
  // mocks
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
  };
  const mockLogRepository: LogRepository = {
    savedLog: jest.fn(),
    getLogs: jest.fn(),
  };

  // use-case
  const email = 'llanquepol@gmail.io';
  const sentEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should send email logs', async () => {
    const sent = await sentEmailLogs.execute(email);

    expect(sent).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.savedLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeveretyLevel.low,
      message: `Email sent: ${email}`,
      origin: 'send-email-logs.ts',
    });
  });

  test('Should not send email logs and return false', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValueOnce(false);
    const notSend = await sentEmailLogs.execute(email);

    expect(notSend).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.savedLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: LogSeveretyLevel.high,
      message: 'Email not sent',
      origin: 'send-email-logs.ts',
    });
  });
});
