import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceDto } from './dto/insurance.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  saveData(@Body() data: InsuranceDto, @Req() req) {
    data.user = { id: req.user.id };
    return this.insuranceService.saveData(data);
  }

  @Get()
  allData() {
    return this.insuranceService.allData();
  }

  @Get(':id')
  getId(@Param('id') id) {
    return this.insuranceService.getId(id);
  }

    @Delete('delete')
    @UseGuards(AuthGuard('jwt'))
    deleteOwnData(@Req() req) {
      const userId = req.user.id;
      return this.insuranceService.deleteByUser(userId);
    }
    
    @Patch('update')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    updateData(@Req() req, @Body() data: InsuranceDto) {
      const userId = req.user.id;
      return this.insuranceService.updateByUser(userId, data);
    }
}
