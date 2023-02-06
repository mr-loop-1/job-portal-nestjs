import { get, omit } from 'lodash';
import { plainToClass } from 'class-transformer';
import { Type } from '@nestjs/common';
import { Transformer } from '../transformers/transformer';
import { BaseValidator } from '../validator';
import { Request } from './interfaces';

export class RestController {
  /**
   * Transform a object
   *
   * @param obj
   * @param transformer
   * @param options
   */
  async transform(
    obj: Record<string, any>,
    transformer: Transformer,
    options?: Record<string, any>,
  ): Promise<Record<string, any>> {
    transformer = this.setTransformerContext(transformer, options);

    return await transformer
      .parseIncludes(this.getIncludes(options?.req))
      .work(obj);
  }

  /**
   * Transform collection/array
   *
   * @param collect
   * @param transformer
   * @param options
   */
  async collection(
    collect: Array<Record<string, any>>,
    transformer: Transformer,
    options?: Record<string, any>,
  ): Promise<Array<Record<string, any>>> {
    transformer = this.setTransformerContext(transformer, options);

    const collection = [];
    for (const o of collect) {
      collection.push(
        await transformer.parseIncludes(this.getIncludes(options?.req)).work(o),
      );
    }
    return collection;
  }

  /**
   * Transform with paginate
   * @param obj
   * @param transformer
   * @param options
   */
  async paginate(
    obj: Record<string, any>,
    transformer: Transformer,
    options?: Record<string, any>,
  ): Promise<Record<string, any>> {
    const collection = this.collection(obj.data, transformer, options);

    return {
      data: await collection,
      pagination: obj.pagination,
      ...omit(obj, ['data', 'pagination']),
    };
  }

  private setTransformerContext(
    transformer: Transformer,
    options: Record<string, any>,
  ): Transformer {
    // add request object to the transformer's context
    transformer.ctx.setRequest(options?.req || {});
    return transformer;
  }

  getIncludes(req: any) {
    if (!req) return '';
    return get(req.all(), 'include', '');
  }

  validator(req: Request): BaseValidator {
    const validator = new BaseValidator();

    req && validator.setContext(req);
    return validator;
  }

  buildDto<T>(schemaPayload: Record<string, any>, schemaMeta: Type<T>): T {
    return plainToClass(schemaMeta, schemaPayload);
  }
}
