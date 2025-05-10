import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './insurance.entity';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
