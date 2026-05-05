import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from '@/users/user.entity';
import { TodoService } from './todo.service';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { TodoDto } from './dtos/todo.dto';
import { withAuth } from '@/decorators/auth.decorator';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodoService) {}
  @Post()
  @withAuth()
  @HttpCode(201)
  @Serialize(TodoDto)
  createTodo(@Body() data: CreateTodoDto, @CurrentUser() user: User) {
    return this.todoService.createTodo({
      title: data.title,
      description: data.description,
      userId: user.id,
    });
  }

  @Get()
  @withAuth()
  @HttpCode(200)
  findTodosByUserId(@CurrentUser() user: User) {
    console.log('findTodosByUserId ', user);
    return this.todoService.findTodosByUserId(user.id);
  }

  @Put(':id')
  @withAuth()
  @HttpCode(200)
  @Serialize(TodoDto)
  updateTodo(
    @Param() params: { id: string },
    @Body() data: CreateTodoDto,
    @CurrentUser() user: User,
  ) {
    return this.todoService.updateTodo(+params.id, user.id, data);
  }

  @Delete(':id')
  @withAuth()
  @HttpCode(204)
  deleteTodo(@Param() data: { id: string }, @CurrentUser() user: User) {
    return this.todoService.deleteTodo(+data.id, user.id);
  }

  @Patch(':id')
  @withAuth()
  @HttpCode(204)
  @Serialize(TodoDto)
  toggleCompletion(@Param() params: { id: string }, @CurrentUser() user: User) {
    return this.todoService.toggleCompletion(+params.id, user.id);
  }
}
