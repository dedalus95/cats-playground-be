import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findOne(): string {
    return 'Florio puzza!';
  }
}
