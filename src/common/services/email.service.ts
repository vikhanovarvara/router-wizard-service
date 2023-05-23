import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { EmailSendDto } from 'common/dto/email-send.dto';
import { generateCode } from 'common/utils/confirmation';
import { env } from 'common/utils/env';

import { encodeSomeDataCode } from './jwt.service';

const EMAIL_AUTH_USER = env('EMAIL_AUTH_USER');
const EMAIL_CODE_SECRET = env('EMAIL_CODE_SECRET');

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

  async sendCode(email: string) {
    const confirmationCode = generateCode();

    await this.send({
      email,
      text: confirmationCode,
      subject: 'Confirmation code',
    });

    return encodeSomeDataCode(email, confirmationCode, EMAIL_CODE_SECRET);
  }
}
