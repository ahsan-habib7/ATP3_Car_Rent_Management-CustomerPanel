import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  planName: string;

  @Column()
  coverageDetails: string;

  @Column()
  deductibleAmount: number; 

  @Column()
  price: number; 

  @ManyToOne(() => User, (user) => user.insurances)
    user: User;
}
