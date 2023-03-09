import { RestServer } from '@libs/boat';
import { AuthApisModule } from './module';
RestServer.make(AuthApisModule, {
  port: +process.env.APP_PORT,
  addValidationContainer: true,
});
