import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: { name: string; email: string; password: string }) {
    return this.authService.register(data);
  }

  @Post('verify-otp')
  verifyOtp(@Body() data: { email: string; otp: string }) {
    return this.authService.verifyOtp(data.email, data.otp);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    const user = req.user;
    return this.authService.getFullUserInfo(user.id);
  }

  @Post('forgot-password')
  @UsePipes(ValidationPipe)
  forgotPassword(@Body() data: { email: string }) {
    return this.authService.sendResetOtp(data.email);
  }

  @Post('reset-password')
  @UsePipes(ValidationPipe)
  resetPassword(@Body() data: { email: string; otp: string; newPassword: string }) {
    return this.authService.resetPassword(data.email, data.otp, data.newPassword);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  @UsePipes(ValidationPipe)
  changePassword(
    @Req() req: Request,
    @Body() data: { currentPassword: string; newPassword: string }
  ) {
    const userId = (req as any).user?.id;
    return this.authService.changePassword(userId, data.currentPassword, data.newPassword);
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return { message: 'Logged out successfully' };
  }
}
