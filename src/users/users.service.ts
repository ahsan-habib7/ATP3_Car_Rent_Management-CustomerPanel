import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(data) {
    return this.userRepo.save(data);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }

  async findUserWithRelations(userId: number) {
  return this.userRepo.findOne({
    where: { id: userId },
    relations: ['bookings', 'payments', 'notifications', 'fuels', 'insurances', 'savedVehicles'], // update based on your actual relations
  });
}


    findById(id: number) {
      return this.userRepo.findOne({
        where: { id },
        relations: [
          'bookings',
          'fuels',
          'insurances',
          'payments',
          'savedVehicles',
          'notifications',
        ],
      });
    }    
}
