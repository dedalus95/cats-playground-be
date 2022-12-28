import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import {UsersRepository} from "./repository/users.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "../cats/schemas/cat.schema";
import {User, UserSchema} from "./entities/user.schema";

@Module({
  imports: [MongooseModule.forFeature([
    {name : User.name, schema : UserSchema},
  ])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
