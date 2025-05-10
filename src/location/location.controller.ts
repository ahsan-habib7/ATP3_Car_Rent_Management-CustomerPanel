import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  saveData(@Body() data: LocationDto) {
    return this.locationService.saveData(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  allData() {
    return this.locationService.allData();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getId(@Param('id') id) {
    return this.locationService.getId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteById/:id')
  deleteId(@Param('id') id) {
    return this.locationService.deleteId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateData(@Param('id') id, @Body() data) {
    return this.locationService.updateData(id, data);
  }
}
