import { IsNotEmpty, IsString } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  branchName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  services: string;

  @IsNotEmpty()
  @IsString()
  hours: string;
}
