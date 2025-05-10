import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(data) {
    const userExists = await this.userService.findByEmail(data.email);
    if (userExists) {
      return { message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
      otp,
      otpExpiresAt: expiresAt,
      isOtpVerified: false,
    });

    await this.mailService.sendOtpEmail(data.email, otp);
    return { message: 'OTP sent to your email. Please verify to complete registration.' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) 
      return { message: 'User not found' };
    if (!user.otp || !user.otpExpiresAt) 
      return { message: 'No OTP found' };
    if (user.otp !== otp) 
      return { message: 'Invalid OTP' };
    if (new Date() > user.otpExpiresAt) 
      return { message: 'OTP expired' };

    user.otp = null;
    user.otpExpiresAt = null;
    user.isOtpVerified = true;
    await this.userService.update(user.id, user);

    return { message: 'OTP verified successfully' };
  }

  async login(data) {
    const allowedFields = ['email', 'password'];
    const invalidFields = Object.keys(data).filter((key) => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return {
        message: 'Invalid fields. You can just use email and password',
        invalidFields,
      };
    }

    const user = await this.userService.findByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return { message: 'Invalid credentials' };
    }

    if (!user.isOtpVerified) {
      return { message: 'Email not verified. Please complete OTP verification first.' };
    }

    return this.generateToken(user);
  }

  generateToken(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getProfile(userId: number) {
    return this.userService.findUserWithRelations(userId);
  }
  
  async getFullUserInfo(userId: number) {
    return this.userService.findById(userId); 
  }  

  async sendResetOtp(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user){
      return { message: 'User not found' };
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  
    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await this.userService.update(user.id, user);
  
    await this.mailService.sendOtpEmail(email, otp);
    return { message: 'OTP sent to your email for password reset' };
  }
  
  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
  
    if (!user.otp || !user.otpExpiresAt) //throw new BadRequestException('No OTP found');
      return { message: 'No OTP found' };
    if (user.otp !== otp) //throw new UnauthorizedException('Invalid OTP');
      return { message: 'Invalid OTP' };
    if (new Date() > user.otpExpiresAt) //throw new UnauthorizedException('OTP expired');
      return { message: 'OTP expired' };
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    await this.userService.update(user.id, user);
  
    return { message: 'Password has been reset successfully' };
  }
  
  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.userService.findById(userId);
    if (!user) //throw new UnauthorizedException('User not found');
      return { message: 'User not found' };
  
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) //throw new UnauthorizedException('Current password is incorrect');
      return { message: 'Current password is incorrect' };
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userService.update(user.id, user);
  
    return { message: 'Password changed successfully' };
  }
  
}