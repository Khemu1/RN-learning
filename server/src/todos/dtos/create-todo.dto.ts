import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  title!: string;
  @IsString()
  @IsOptional()
  description!: string;
}
