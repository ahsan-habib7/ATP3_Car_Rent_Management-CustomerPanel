import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Booking } from '../booking/booking.entity';
import { User } from '../users/user.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Booking, User]), MailModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
