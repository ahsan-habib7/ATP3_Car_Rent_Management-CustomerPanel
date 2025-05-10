import { Test, TestingModule } from '@nestjs/testing';
import { SavedVehiclesController } from './saved-vehicles.controller';

describe('SavedVehiclesController', () => {
  let controller: SavedVehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedVehiclesController],
    }).compile();

    controller = module.get<SavedVehiclesController>(SavedVehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
