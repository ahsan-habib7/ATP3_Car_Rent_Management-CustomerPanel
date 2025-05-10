import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalSummary } from './rental-summary.entity';
import { RentalSummaryService } from './rental-summary.service';
import { RentalSummaryController } from './rental-summary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RentalSummary])],
  controllers: [RentalSummaryController],
  providers: [RentalSummaryService],
})
export class RentalSummaryModule {}
