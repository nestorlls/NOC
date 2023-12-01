import nodeMailer from 'nodemailer';

import {
  EmailService,
  EmailOptions,
} from '../../../src/presentation/email/email.service';

describe('Test email.service.ts EmailService', () => {
  const mockSendEmail = jest.fn();
  nodeMailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const emailService = new EmailService();

  test('Should send email', async () => {
    const options: EmailOptions = {
      to: 'llanquepol@gmail.io',
      subject: 'test',
      htmlBody: 'test',
    };

    const send = await emailService.sendEmail(options);

    expect(send).toBeTruthy();
    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: options.htmlBody,
      subject: options.subject,
      to: options.to,
    });
  });

  test('Should send email with file system logs', async () => {
    const email = 'llanquepol@gmail.io';
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: [
        { filename: 'logs-all.log', path: 'logs/logs-all.log' },
        { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
        { filename: 'logs-high.log', path: 'logs/logs-high.log' },
      ],
      html: expect.any(String),
      subject: 'logs del servidor',
      to: email,
    });
  });
});
