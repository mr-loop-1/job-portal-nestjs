import { RestServer } from '@libs/boat';
import { UserApisModule } from './module';
RestServer.make(UserApisModule, {
  port: +process.env.APP_PORT,
  addValidationContainer: true,
  globalPrefix: 'api/v1',
});
