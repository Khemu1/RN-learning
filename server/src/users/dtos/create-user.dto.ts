import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
