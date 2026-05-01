import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo';

@Controller('todos')
export class TodosController {
  @Post()
  @HttpCode(201)
  createTodo(@Body() data: CreateTodoDto) {
    return data;
  }
}
