import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private repo: Repository<Car>) {}

  findAll() {
    return this.repo.find({ where: { isAvailable: true } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findByType(type: string) {
    return this.repo.find({ where: { type, isAvailable: true } });
  }

  findByAvailability(isAvailable: boolean) {
    return this.repo.find({ where: { isAvailable } });
  }
}
