import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeveretyLevel } from '../../domain/entyties/log.entity';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private tranporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_MAIL,
      pass: envs.MAILER_MAIL_SECRET_KEY,
    },
  });

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const info = await this.tranporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'logs del servidor';
    const htmlBody = `
      <h1>Logs del servidor</h1>
      <ul>
        <li>logs-all.log</li>
        <li>logs-medium.log</li>
        <li>logs-high.log</li>
      </ul>  
    `;

    const attachments = [
      { filename: 'logs-all.log', path: 'logs/logs-all.log' },
      { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
      { filename: 'logs-high.log', path: 'logs/logs-high.log' },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
