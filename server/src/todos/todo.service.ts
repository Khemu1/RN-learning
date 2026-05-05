import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}
  async createTodo(data: {
    title: string;
    description: string;
    userId: number;
  }) {
    const todo = this.repo.create({
      title: data.title,
      description: data.description,
      user: {
        id: data.userId,
      },
    });
    return await this.repo.save(todo);
  }
  async findTodosByUserId(userId: number) {
    const todos = await this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        title: true,
        description: true,
        id: true,
        completed: true,
      },
      order: {
        created_at: 'ASC',
      },
    });
    return todos;
  }

  async updateTodo(
    id: number,
    userId: number,
    data: { title: string; description: string },
  ) {
    const todo = await this.repo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    Object.assign(todo, {
      title: data.title,
      description: data.description,
    });
    return await this.repo.save(todo);
  }

  async deleteTodo(id: number, userId: number) {
    const todo = await this.repo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    await this.repo.remove(todo);
  }

  async toggleCompletion(id: number, userId: number) {
    const todo = await this.repo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    todo.completed = !todo.completed;
    await this.repo.save(todo);
  }
}
