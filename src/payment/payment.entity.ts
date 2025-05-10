import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Booking } from '../booking/booking.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  rentalDays: number;

  @Column()
  baseRate: number;

  @Column()
  taxRate: number;

  @Column({ nullable: true })
  discountCode: string;

  @Column()
  finalPrice: number;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'SUCCESS' | 'FAILED';

  @Column({ nullable: true })
  transactionId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @Column()
  bookingId: number;

  @Column()
  paymentMethod: string; // 'bkash' | 'nagad' | 'rocket'
}
