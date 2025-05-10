import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class SavedVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  vehicleName: string;

  @Column()
  vehicleModel: string;

  @Column()
  vehicleImageUrl: string; 

  @ManyToOne(() => User, (user) => user.savedVehicles)
    user: User;
}
