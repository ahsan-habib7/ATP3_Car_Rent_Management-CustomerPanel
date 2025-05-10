import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsIn(['bkash', 'nagad', 'rocket'])
  paymentMethod: string;

  @IsOptional()
  @IsString()
  discountCode?: string;
}
