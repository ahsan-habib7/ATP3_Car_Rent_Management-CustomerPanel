import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RentalSummaryDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  vehicleName: string;

  @IsNotEmpty()
  @IsString()
  pickupDate: string;

  @IsNotEmpty()
  @IsString()
  returnDate: string;

  @IsNotEmpty()
  @IsString()
  insurancePlan: string;

  @IsNotEmpty()
  @IsString()
  fuelStatus: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
