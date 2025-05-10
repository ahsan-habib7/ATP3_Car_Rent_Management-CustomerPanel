import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '2525'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Car Rental" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code',
      html: `<h2>Your OTP is: <strong>${otp}</strong></h2>`,
    });
  }

  /*async sendTransactionEmail(to: string, transactionId: string) {
    const mailOptions = {
      from: '"Car Rental App" <noreply@carrental.com>',
      to,
      subject: 'Payment Confirmation',
      text: `Your payment was successful. Transaction ID: ${transactionId}`,
      html: `<p>Your payment was successful.</p><p><strong>Transaction ID:</strong> ${transactionId}</p>`,
    };

    return this.transporter.sendMail(mailOptions);
  }*/
}
