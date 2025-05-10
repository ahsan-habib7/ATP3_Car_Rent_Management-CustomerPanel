import { IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  createdAt: string;

  //@IsNotEmpty()
  user: any; 
}
