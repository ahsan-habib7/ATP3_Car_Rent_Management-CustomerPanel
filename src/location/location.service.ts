import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private myRepo: Repository<Location>) {}

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
    const location = await this.myRepo.findOne({ where: { id } });
    if (!location) {
      return 'Not Found';
    } else {
      const updated = Object.assign(location, data);
      this.myRepo.save(updated);
      return 'Updated';
    }
  }
}
