import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Notification } from '../notifications/notification.entity';
import { Booking } from 'src/booking/booking.entity';
import { Fuel } from 'src/fuel/fuel.entity';
import { Insurance } from 'src/insurance/insurance.entity';
import { Payment } from 'src/payment/payment.entity';
import { SavedVehicle } from 'src/saved-vehicles/saved-vehicle.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Fuel, (fuel) => fuel.user)
  fuels: Fuel[];

  @OneToMany(() => Insurance, (insurance) => insurance.user)
  insurances: Insurance[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => SavedVehicle, (savedVehicle) => savedVehicle.user)
  savedVehicles: SavedVehicle[];

  @Column({ nullable: true, type: 'varchar'})
  otp: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  otpExpiresAt: Date | null;

  @Column({ default: false })
  isOtpVerified: boolean;

}
