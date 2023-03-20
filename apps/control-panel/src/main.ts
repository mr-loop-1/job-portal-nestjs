import { RestServer } from '@libs/boat';
import { AppModule } from './module';
RestServer.make(AppModule, {
  port: +process.env.APP_PORT,
  addValidationContainer: true,
});