import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Car } from '../car/car.entity'; 
import { BookingDto } from './dto/booking.dto';
import * as moment from 'moment';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Car) private carRepo: Repository<Car>
  ) {}

    async saveData(data) {
      console.log('Booking Data Received:', data); 
      const car = await this.carRepo.findOne({ where: { id: data.carId } });
      console.log('Car Fetched:', car); 
    
      if (!car) {
        return { message: 'Car not found' };
      }
    
      const startDate = moment(data.pickupDate);
      const endDate = moment(data.returnDate);
      const rentalDays = endDate.diff(startDate, 'days');
    
      if (rentalDays <= 0) {
        return { message: 'Invalid rental period' };
      }
    
      const totalPrice = rentalDays * car.pricePerDay;
    
      return this.bookingRepo.save({
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
        carId: car.id,
        price: totalPrice,
        userId: data.user.id
      });
    }
    

  allData() {
    return this.bookingRepo.find({ relations: ['user', 'car'] });
  }

  getId(id) {
    return this.bookingRepo.findOne({ where: { id }, relations: ['user', 'car'] });
  }

    async updateByUser(userId: number, newData: BookingDto) {
      const booking = await this.bookingRepo.findOne({ where: { user: { id: userId } } });
    
      if (!booking) {
        return { message: 'Booking not found for this user' };
      }
    
      if (newData.pickupDate) booking.pickupDate = newData.pickupDate;
      if (newData.returnDate) booking.returnDate = newData.returnDate;
    
      if (newData.carId) {
        const car = await this.carRepo.findOne({ where: { id: newData.carId } });
        if (!car) {
          return { message: 'Selected car not found' };
        }
    
        booking.carId = newData.carId;
    
        const startDate = moment(newData.pickupDate || booking.pickupDate);
        const endDate = moment(newData.returnDate || booking.returnDate);
        const rentalDays = endDate.diff(startDate, 'days');
    
        if (rentalDays <= 0) {
          return { message: 'Invalid rental period' };
        }
    
        booking.price = rentalDays * car.pricePerDay;
      }
    
      await this.bookingRepo.save(booking);
      return { message: 'Booking updated successfully', booking };
    }

  async deleteByUser(userId: number) {
    const result = await this.bookingRepo.delete({ user: { id: userId } });
    if (result.affected === 0) {
      
      return {message: 'No booking found to delete for this user'};
    }
    return { message: 'Booking deleted successfully' };
  }
}
