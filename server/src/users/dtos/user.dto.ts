import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id!: number;
  @Expose()
  email!: string;
  @Expose()
  username!: string;

  @Expose()
  token!: string;
}

export class LoginUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
