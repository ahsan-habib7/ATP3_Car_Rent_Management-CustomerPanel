import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FuelService } from './fuel.service';
import { FuelDto } from './dto/fuel.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  saveData(@Req() req, @Body() data: FuelDto) {
    const user = req.user;
    return this.fuelService.saveData(data, user);
  }

  @Get()
  allData() {
    return this.fuelService.allData();
  }

  @Get(':id')
  getId(@Param('id') id) {
    return this.fuelService.getId(id);
  }
  
  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  deleteOwnData(@Req() req) {
    const userId = req.user.id;
    return this.fuelService.deleteByUser(userId);
  }
      
  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  updateData(@Req() req, @Body() data: FuelDto) {
    const userId = req.user.id;
    return this.fuelService.updateByUser(userId, data);
  } 
}
