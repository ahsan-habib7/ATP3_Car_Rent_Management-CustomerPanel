import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(Notification) private myRepo: Repository<Notification>) {}

  saveData(data) {
    return this.myRepo.save({
      ...data,
      user: { id: data.user.id }
    });
  }
  
  allData() {
    return this.myRepo.find({ relations: ['user'] });
  }

  getId(id) {
    return this.myRepo.findOne({ where: { id }, relations: ['user'] });
  }

  deleteId(id) {
    this.myRepo.delete(id);
    return 'Deleted';
  }

  async updateData(id, data) {
    const notif = await this.myRepo.findOne({ where: { id } });
    if (!notif) {
      return 'Not Found';
    } else {
      const updated = Object.assign(notif, data);
      await this.myRepo.save(updated);
      return 'Updated';
    }
  }
}
