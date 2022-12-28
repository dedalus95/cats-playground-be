import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}


  @Get()
  async getCat(): Promise<string> {
    console.log("getCat");
    return 'il micio'
  }
}
