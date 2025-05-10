import { Test, TestingModule } from '@nestjs/testing';
import { SavedVehiclesService } from './saved-vehicles.service';

describe('SavedVehiclesService', () => {
  let service: SavedVehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedVehiclesService],
    }).compile();

    service = module.get<SavedVehiclesService>(SavedVehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
