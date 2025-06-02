import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { CommentsModule } from 'src/comments/comments.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    // Load User entity into TypeORM
    TypeOrmModule.forFeature([User]),

    // Make UsersModule available to AuthService
    UsersModule,

    // Task-related functionality
    TasksModule,

    // Other feature modules
    CommentsModule,
    ProductsModule,

    // Configure Passport to use JWT strategy by default
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configure JwtModule (secret + expiration)
    JwtModule.register({
      secret: 'clave-secreta',
      signOptions: {expiresIn: '1h'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}