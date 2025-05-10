import { Body, Controller, Get, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
@UseGuards(AuthGuard('jwt'))
async createPayment(@Req() req: Request, @Body() body: CreatePaymentDto) {
  const user = (req as any).user;
  return this.paymentService.createPayment(user, body);
}

  @Post('confirm')
  @UseGuards(AuthGuard('jwt'))
  async confirmPayment(@Req() req: Request, @Body() body: ConfirmPaymentDto) {
    const user = (req as any).user;
    return this.paymentService.confirmPayment(user, body.transactionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserPayments(@Req() req: Request) {
    const user = (req as any).user;
    return this.paymentService.getPaymentsByUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cancel/:paymentId')
  cancelPayment(@Param('paymentId') paymentId: number) {
    return this.paymentService.cancelPayment(paymentId);
  }
}
