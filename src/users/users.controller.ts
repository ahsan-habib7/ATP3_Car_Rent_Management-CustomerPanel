import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
