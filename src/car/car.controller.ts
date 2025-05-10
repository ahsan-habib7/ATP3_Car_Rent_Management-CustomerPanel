import { Controller, Get, Param } from '@nestjs/common';
import { CarService } from './car.service';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.carService.findById(id);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.carService.findByType(type);
  }

  @Get('available/:isAvailable')
  findByAvailable(@Param('isAvailable') isAvailable: string) {
    const available = isAvailable === 'true';
    return this.carService.findByAvailability(available);
  }
}
