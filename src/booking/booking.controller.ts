import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  saveData(@Body() data: BookingDto, @Req() req) {
    data.user = { id: req.user.id };
    return this.bookingService.saveData(data);
  }

  @Get()
  allData() {
    return this.bookingService.allData();
  }

  @Get(':id')
  getId(@Param('id') id) {
    return this.bookingService.getId(id);
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  deleteOwnData(@Req() req) {
    const userId = req.user.id;
    return this.bookingService.deleteByUser(userId);
  }
      
  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  updateData(@Req() req, @Body() data: BookingDto) {
    const userId = req.user.id;
    return this.bookingService.updateByUser(userId, data);
  }
}
