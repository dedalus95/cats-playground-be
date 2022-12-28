import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {CatsController} from "./cats/controller/cats.controller";
import {CatsService} from "./cats/service/cats.service";
import {CatsRepository} from "./cats/repository/cats.repository";
import {CatsModule} from "./cats/cats.module";
import { AuthModule } from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017'),
      ConfigModule.forRoot(),
      AuthModule,
      CatsModule,
      AuthModule,
      UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
