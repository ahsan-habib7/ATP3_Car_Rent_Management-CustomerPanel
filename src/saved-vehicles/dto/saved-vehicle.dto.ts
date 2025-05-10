import { IsNotEmpty, IsString } from 'class-validator';

export class SavedVehicleDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  vehicleName: string;

  @IsNotEmpty()
  @IsString()
  vehicleModel: string;

  @IsNotEmpty()
  @IsString()
  vehicleImageUrl: string;
}
