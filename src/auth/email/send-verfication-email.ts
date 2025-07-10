import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'abdullahsaleem1096@gmail.com',
      pass: 'vlse rdzz chje wdtw',
    },
  });

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `http://localhost:3000/v1/users/verify-email/${token}`;
    await this.transporter.sendMail({
      from: 'abdullahsaleem1096@gmail.com',
      to: email,
      subject: 'Verify your Nustify account',
      html: `<p>Please click the link to verify your account:</p>
             <a href="${verificationUrl}">Verify Now</a>`,
    });
  }
}
// from: '"Nustify" <abdullahsaleem1096@gmail.com>'