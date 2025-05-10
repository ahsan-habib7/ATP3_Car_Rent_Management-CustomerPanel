import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SavedVehicleService } from './saved-vehicles.service';
import { SavedVehicleDto } from './dto/saved-vehicle.dto';

@Controller('saved-vehicles')
export class SavedVehicleController {
  constructor(private readonly savedVehicleService: SavedVehicleService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  saveData(@Body() data: SavedVehicleDto) {
    return this.savedVehicleService.saveData(data);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  allData() {
    return this.savedVehicleService.allData();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  getId(@Param('id') id) {
    return this.savedVehicleService.getId(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete('deleteById/:id')
  deleteId(@Param('id') id) {
    return this.savedVehicleService.deleteId(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateData(@Param('id') id, @Body() data) {
    return this.savedVehicleService.updateData(id, data);
  }
}
