import { Test, TestingModule } from '@nestjs/testing';
import { RentalSummaryController } from './rental-summary.controller';

describe('RentalSummaryController', () => {
  let controller: RentalSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalSummaryController],
    }).compile();

    controller = module.get<RentalSummaryController>(RentalSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
