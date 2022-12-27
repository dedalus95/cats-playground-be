import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Cat} from "./cats/schemas/cat.schema";

@Controller()
export class AppController {
  constructor() {}


  @Get()
  async getCat(): Promise<string> {
    console.log("getCat");
    return 'il micio'
  }
}
