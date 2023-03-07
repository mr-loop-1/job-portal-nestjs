import { NestFactory } from '@nestjs/core';
import { AuthApisModule } from './auth-apis.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthApisModule);
  await app.listen(3000);
}
bootstrap();
