import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { EmailSendDto } from 'common/dto/email-send.dto';
import { env } from 'common/utils/env';

const EMAIL_AUTH_USER = env('EMAIL_AUTH_USER');

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async send({ email, text = '', html, subject, date }: EmailSendDto) {
    return this.mailService.sendMail({
      to: email,
      from: EMAIL_AUTH_USER,
      subject,
      date,
      text,
      html,
    });
  }
}
