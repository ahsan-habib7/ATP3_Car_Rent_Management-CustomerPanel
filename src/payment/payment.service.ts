import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Booking } from '../booking/booking.entity';
import { User } from '../users/user.entity';
import { randomUUID } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly MailService: MailService,
  ) {}

  async createPayment(user: Partial<User>, dto: CreatePaymentDto) {
    const booking = await this.bookingRepo.findOne({
      where: {
        user: { id: user.id },
        //status: 'PENDING',
      },
      relations: ['car'],
      order: { id: 'DESC' },
    });
  
    if (!booking) throw new NotFoundException('No pending booking found.');
  
    const pickupDate = new Date(booking.pickupDate);
    const returnDate = new Date(booking.returnDate);
    const rentalDays = Math.ceil((+returnDate - +pickupDate) / (1000 * 60 * 60 * 24));
  
    const baseRate = booking.price;
    const taxRate = 3;
    const discount = dto.discountCode ? 50 : 0;
  
    const total = baseRate + baseRate * taxRate - discount;
    const transactionId = randomUUID();
  
    const payment = this.paymentRepo.create({
      customerName: user.name || 'Customer',
      rentalDays,
      baseRate,
      taxRate,
      discountCode: dto.discountCode ?? undefined,
      finalPrice: total,
      status: 'PENDING',
      userId: user.id,
      bookingId: booking.id,
      paymentMethod: dto.paymentMethod,
      transactionId,
    });
    
    return this.paymentRepo.save(payment);
  }
  
  getPaymentsByUser(userId: number) {
    return this.paymentRepo.find({ where: { userId } });
  }

  async confirmPayment(user: Partial<User>, transactionId: string) {
    const payment = await this.paymentRepo.findOne({
      where: { transactionId, userId: user.id },
    });
  
    if (!payment) return 'No pending payment found with the provided transaction ID.';
  
    if (payment.status === 'SUCCESS') return 'Payment is already confirmed.';
  
    payment.status = 'SUCCESS';
    return this.paymentRepo.save(payment);
  }
  
  

  async cancelPayment(paymentId: number) {
    const payment = await this.paymentRepo.findOne({ where: { id: paymentId } });
    if (!payment) return 'Payment not found.';
    payment.status = 'FAILED';
    await this.paymentRepo.save(payment);
    return { message: 'Payment cancelled.', payment };
  }
}
