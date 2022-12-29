import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import {RefreshTokenRepository} from "./repository/refreshToken.repository";
import {RefreshToken, RefreshTokenSchema} from "./entities/refreshToken";
import {MongooseModule} from "@nestjs/mongoose";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
      MongooseModule.forFeature([
            {name : RefreshToken.name, schema : RefreshTokenSchema},
        ]),
      UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenRepository, JwtStrategy]
})
export class AuthModule {}
