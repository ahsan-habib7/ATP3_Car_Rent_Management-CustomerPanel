import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsNumber()
  rentalDays: number;

  @IsNotEmpty()
  @IsNumber()
  baseRate: number;

  @IsNotEmpty()
  @IsNumber()
  taxRate: number;

  @IsOptional()
  @IsString()
  discountCode?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number; 
}

