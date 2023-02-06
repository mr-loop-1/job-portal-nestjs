import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { get, omit } from 'lodash';
import { Request } from './interfaces';

@Injectable()
export class RequestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.bindRequestHelpers(context.switchToHttp().getRequest());
    this.bindResponseHelpers(context.switchToHttp().getResponse());

    return true;
  }

  /**
   * Bind Response Helpers
   *
   * @param response
   */
  bindResponseHelpers(response: any): any {
    const success = function (data: Record<string, any> | Array<any> | string, message, status = 200) {
      return response.status(status).json({
        success: true,
        code: status,
        data: data,
        message: message,
      });
    };

    const error = function (error: Record<string, any> | string, status = 401) {
      let message = 'Something went wrong!';
      let errors = null;
      if (error instanceof Object) {
        message = error.message;
        errors = error.errors;
      } else {
        message = error;
      }

      return response.status(status).json({
        success: false,
        code: status,
        message: message,
        errors: errors,
      });
    };

    const noContent = function () {
      return response.status(204).end();
    };

    const withMeta = function (data: Record<string, any>, status = 200) {
      return response.status(status).json({
        success: true,
        code: status,
        data: get(data, 'data'),
        meta: omit(data, ['data']),
      });
    };

    response.success = success;
    response.error = error;
    response.noContent = noContent;
    response.withMeta = withMeta;

    return response;
  }

  /**
   * Bind Request Helpers
   *
   * @param request
   */
  bindRequestHelpers(request: any): any {
    const all = function (): Record<string, any> {
      const inputs = { ...request.query, ...request.body, ...request.params };

      for (const key in inputs) {
        const value = inputs[key];
        if (typeof value === 'string' || value instanceof String) {
          inputs[key] = value.trim();
        }
      }

      return inputs;
    };

    const getContext = function (): Request {
      return {
        user: request.user,
        ...request.query,
        ...request.body,
        ...request.params,
      };
    };

    const client = function (): Record<string, any> {
      return {
        timezone: request.headers.timezone,
        deviceHash: request.headers['x-device-hash'],
        appVersion: request.headers['x-app-version'],
        deviceLang: request.headers['x-device-lang'],
        platformClient: request.headers['x-platform-app'],
        deviceClient: request.headers['x-device-client'],
      };
    };

    request.all = all;
    request.getContext = getContext;
    request.client = client;
    return request;
  }
}
