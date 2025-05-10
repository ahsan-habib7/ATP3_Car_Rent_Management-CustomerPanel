import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedVehicle } from './saved-vehicle.entity';
import { SavedVehicleService } from './saved-vehicles.service';
import { SavedVehicleController } from './saved-vehicles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SavedVehicle])],
  controllers: [SavedVehicleController],
  providers: [SavedVehicleService],
})
export class SavedVehicleModule {}
