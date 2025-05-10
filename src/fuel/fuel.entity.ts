import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Fuel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleName: string;

  @Column()
  fuelLevelAtPickup: string; 

  @Column()
  fuelLevelAtReturn: string;

  @Column()
  refuelCharge: number;

  @Column()
  receiptImageUrl: string;

  @ManyToOne(() => User, user => user.fuels, { nullable: true }) 
  @JoinColumn({ name: 'userId' })
  user: User;
}
