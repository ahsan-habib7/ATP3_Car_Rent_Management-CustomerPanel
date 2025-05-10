import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalSummary } from './rental-summary.entity';

@Injectable()
export class RentalSummaryService {
  constructor(@InjectRepository(RentalSummary) private myRepo: Repository<RentalSummary>) {}

  saveData(data) {
    return this.myRepo.save(data);
  }

  allData() {
    return this.myRepo.find();
  }

  getId(id) {
    return this.myRepo.findOne({ where: { id } });
  }

  deleteId(id) {
    this.myRepo.delete(id);
    return 'Deleted';
  }

  async updateData(id, data) {
    const summary = await this.myRepo.findOne({ where: { id } });
    if (!summary) {
      return 'Not Found';
    } else {
      const updated = Object.assign(summary, data);
      this.myRepo.save(updated);
      return 'Updated';
    }
  }
}
