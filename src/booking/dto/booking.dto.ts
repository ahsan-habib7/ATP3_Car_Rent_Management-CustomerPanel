import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookingDto {
  @IsNotEmpty()
  @IsString()
  pickupDate: string;

  @IsNotEmpty()
  @IsString()
  returnDate: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  carId: number; 

  //@IsNotEmpty()
  user?: any;
}
