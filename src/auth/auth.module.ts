import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    // Load User entity into TypeORM
    TypeOrmModule.forFeature([User]),

    // Make UsersModule available to AuthService
    UsersModule,

    // Configure Passport to use JWT strategy by default
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configure JwtModule (choose your secret and options)
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
