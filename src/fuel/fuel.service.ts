import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fuel } from './fuel.entity';
import { FuelDto } from './dto/fuel.dto';

@Injectable()
export class FuelService {
  constructor(@InjectRepository(Fuel) private fuelRepo: Repository<Fuel>) {}

    async saveData(data: FuelDto, user: any) {
      const fuel = this.fuelRepo.create({
        ...data,
        user: { id: user.id },
      });
      return{
        message: 'Fuel data saved successfully',
      } 
    }
    

  allData() {
    return this.fuelRepo.find();
  }

  getId(id) {
    return this.fuelRepo.findOne({ where: { id } });
  }

  async updateByUser(userId: number, newData: FuelDto) {
    const existing = await this.fuelRepo.findOne({ where: { user: { id: userId } } });
    if (!existing) {
      return { message: 'Fuel not found for this user' };
    }
    Object.assign(existing, newData);
      return this.fuelRepo.save(existing);
  }  
      
    async deleteByUser(userId: number) {
        const result = await this.fuelRepo.delete({ user: { id: userId } });
        if (result.affected === 0) {
          return { message: 'No fuel found to delete for this user' };
        }
        return { message: 'Insurance deleted successfully' };
      }
}
