import { IsOptional, IsString, Min } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @Min(3)
  @Min(25)
  title!: string;
  @IsString()
  @IsOptional()
  description!: string;
}
