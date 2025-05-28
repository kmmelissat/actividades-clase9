import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CommentsModule } from 'src/comments/comments.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    CommentsModule,
    ProductsModule,
    PassportModule,
    JwtModule.register({
      secret: 'clave-secreta',
      signOptions: {expiresIn: '1h'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthModule]
})
export class AuthModule {}
