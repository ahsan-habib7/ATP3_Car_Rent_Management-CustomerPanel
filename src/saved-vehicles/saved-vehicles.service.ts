import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedVehicle } from './saved-vehicle.entity';

@Injectable()
export class SavedVehicleService {
  constructor(@InjectRepository(SavedVehicle) private myRepo: Repository<SavedVehicle>) {}

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
    const saved = await this.myRepo.findOne({ where: { id } });
    if (!saved) {
      return 'Not Found';
    } else {
      const updated = Object.assign(saved, data);
      this.myRepo.save(updated);
      return 'Updated';
    }
  }
}
