import { Test, TestingModule } from '@nestjs/testing';
import { RentalSummaryService } from './rental-summary.service';

describe('RentalSummaryService', () => {
  let service: RentalSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalSummaryService],
    }).compile();

    service = module.get<RentalSummaryService>(RentalSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
