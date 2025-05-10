import { User } from 'src/users/user.entity';
import { Car } from '../car/car.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickupDate: string;

  @Column()
  returnDate: string;

  @ManyToOne(() => Car) 
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column()
  carId: number;

  @Column()
  price: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
  
  @Column()
  userId: number;
}
