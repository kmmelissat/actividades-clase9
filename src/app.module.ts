import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Product } from './products/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'clase9',
      entities: [User, Task, Product],
      synchronize: true,
      logging: true,
    }),
    TasksModule,
    UsersModule,
    SettingsModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
