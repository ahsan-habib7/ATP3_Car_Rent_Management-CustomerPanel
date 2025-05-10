import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RentalSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  vehicleName: string;

  @Column()
  pickupDate: string;

  @Column()
  returnDate: string;

  @Column()
  insurancePlan: string;

  @Column()
  fuelStatus: string; 

  @Column()
  totalPrice: number;
}
