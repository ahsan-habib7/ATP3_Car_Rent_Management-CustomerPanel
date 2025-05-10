import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FuelDto {
  @IsNotEmpty()
  @IsString()
  vehicleName: string;

  @IsNotEmpty()
  @IsString()
  fuelLevelAtPickup: string;

  @IsNotEmpty()
  @IsString()
  fuelLevelAtReturn: string;

  @IsNotEmpty()
  @IsNumber()
  refuelCharge: number;

  @IsNotEmpty()
  @IsString()
  receiptImageUrl: string;

  user?: any;
}
