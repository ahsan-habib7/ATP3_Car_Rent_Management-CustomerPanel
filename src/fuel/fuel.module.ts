import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './fuel.entity';
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fuel])],
  controllers: [FuelController],
  providers: [FuelService],
})
export class FuelModule {}
