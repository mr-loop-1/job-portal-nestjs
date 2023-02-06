import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ServerOptions } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { RequestGuard } from './guards';
import { ExceptionFilter } from '../exceptions';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { TimeoutInterceptor } from './timeoutInterceptor';

export class RestServer {
  private module: any;
  private options: ServerOptions;

  /**
   * Create instance of fastify lambda server
   * @returns Promise<INestApplication>
   */

  static async make(module: any, options?: ServerOptions): Promise<void> {
    const app = await NestFactory.create(module);

    if (options?.addValidationContainer) {
      useContainer(app.select(module), { fallbackOnErrors: true });
    }

    app.enableCors({
      origin: true,
    });

    const config = app.get(ConfigService, { strict: false });
    const server = app.getHttpServer();

    Sentry.init({
      dsn: config.get('app.sentryDsn'),
      environment: config.get('app.env'),
      enabled: config.get('app.env') === 'prod' || config.get('app.env') === 'production',
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({
          app: server._events.request_router,
        }),
        new Tracing.Integrations.Postgres(),
      ],
      tracesSampleRate: config.get('app.SentrySampleRate'),
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());

    // interceptors
    app.useGlobalInterceptors(new TimeoutInterceptor());
    // guards
    app.useGlobalGuards(new RequestGuard());

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));

    options.globalPrefix && app.setGlobalPrefix(options.globalPrefix);
    const appPort = options.port || config.get<number>('app.port');
    await app.listen(appPort);
    console.log(`🚀 ${module.name} is running on appPort - ${appPort}`);
  }
}
