import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { Car } from 'src/car/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Car])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
