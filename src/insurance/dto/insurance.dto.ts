import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsuranceDto {
  @IsNotEmpty()
  @IsString()
  planName: string;

  @IsNotEmpty()
  @IsString()
  coverageDetails: string;

  @IsNotEmpty()
  @IsNumber()
  deductibleAmount: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  user?:any;
}
