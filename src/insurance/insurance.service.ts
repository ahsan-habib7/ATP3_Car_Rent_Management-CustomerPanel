import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insurance } from './insurance.entity';
import { InsuranceDto } from './dto/insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(@InjectRepository(Insurance) private insuranceRepo: Repository<Insurance>) {}

  saveData(data) {
    return this.insuranceRepo.save(data);
  }

  allData() {
    return this.insuranceRepo.find();
  }

  getId(id) {
    return this.insuranceRepo.findOne({ where: { id } });
  }

    async updateByUser(userId: number, newData: InsuranceDto) {
      const existing = await this.insuranceRepo.findOne({ where: { user: { id: userId } } });
      if (!existing) {
        return { message: 'Insurance not found for this user' };
      }
      Object.assign(existing, newData);
      return this.insuranceRepo.save(existing);
    }
    
    async deleteByUser(userId: number) {
      const result = await this.insuranceRepo.delete({ user: { id: userId } });
      if (result.affected === 0) {
        return { message: 'No insurance found to delete for this user' };
      }
      return { message: 'Insurance deleted successfully' };
    }
}
