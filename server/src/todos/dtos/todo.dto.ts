import { Expose, Transform } from 'class-transformer';
import { Todo } from '../todos.entity';

export class TodoDto {
  @Expose()
  id!: number;

  @Transform(({ obj }) => (obj as Todo).user?.id)
  @Expose()
  user_id!: number;

  @Expose()
  title!: string;
  @Expose()
  description!: string;
  @Expose()
  completed!: boolean;
}
