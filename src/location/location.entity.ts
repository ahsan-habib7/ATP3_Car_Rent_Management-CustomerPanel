import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  services: string; 

  @Column()
  hours: string; 
}
