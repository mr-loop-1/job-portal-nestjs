// import { NestFactory } from '@nestjs/core';
// import { AuthApisModule } from './auth-apis.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AuthApisModule);
//   await app.listen(3000);
// }
// bootstrap();

import { RestServer } from '@libs/boat';
import { AuthApisModule } from './auth-apis.module';
RestServer.make(AuthApisModule, {
  port: +process.env.APP_PORT,
  addValidationContainer: true,
});
