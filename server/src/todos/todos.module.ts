import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Todo } from './todos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
  providers: [],
  controllers: [],
})
export class TodosModule {}
