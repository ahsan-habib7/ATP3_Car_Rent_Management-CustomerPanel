import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notifications.service';
import { NotificationDto } from './dto/notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
    @UsePipes(ValidationPipe)
    saveData(@Body() data: NotificationDto) {
        return this.notificationService.saveData(data);
    }

  @Get()
  allData() {
    return this.notificationService.allData();
  }

  @Get(':id')
  getId(@Param('id') id) {
    return this.notificationService.getId(id);
  }

  @Delete('deleteById/:id')
  deleteId(@Param('id') id) {
    return this.notificationService.deleteId(id);
  }

  @Patch('update/:id')
  updateData(@Param('id') id, @Body() data) {
    return this.notificationService.updateData(id, data);
  }
}
