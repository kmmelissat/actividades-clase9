import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]),
  UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
