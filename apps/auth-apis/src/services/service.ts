import { Injectable } from '@nestjs/common';

@Injectable()
export class UserApisService {
  getHello(): string {
    return 'Hello World!';
  }
}
