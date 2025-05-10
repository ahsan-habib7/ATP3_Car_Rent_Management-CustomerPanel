import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'you should have an email to login' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
