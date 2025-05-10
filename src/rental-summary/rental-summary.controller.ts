import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RentalSummaryService } from './rental-summary.service';
import { RentalSummaryDto } from './dto/rental-summary.dto';

@Controller('rental-summary')
export class RentalSummaryController {
  constructor(private readonly rentalSummaryService: RentalSummaryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  saveData(@Body() data: RentalSummaryDto) {
    return this.rentalSummaryService.saveData(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  allData() {
    return this.rentalSummaryService.allData();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getId(@Param('id') id) {
    return this.rentalSummaryService.getId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteById/:id')
  deleteId(@Param('id') id) {
    return this.rentalSummaryService.deleteId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateData(@Param('id') id, @Body() data) {
    return this.rentalSummaryService.updateData(id, data);
  }
}
