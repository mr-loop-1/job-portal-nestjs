import { NestFactory } from '@nestjs/core';
import { UserApisModule } from './user-apis.module';

async function bootstrap() {
  const app = await NestFactory.create(UserApisModule);
  await app.listen(3000);
}
bootstrap();
