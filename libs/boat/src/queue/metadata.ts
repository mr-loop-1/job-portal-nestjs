import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobOptions } from '@squareboat/nest-queue-strategy';
import { GenericFunction } from '../constants';
import { QueueOptions } from './interfaces';

interface JobTarget {
  options: JobOptions;
  target: GenericFunction;
}

@Injectable()
export class QueueMetadata {
  private static data: QueueOptions;
  private static defaultOptions: Record<string, string | number | undefined>;
  private static store: Record<string, any> = { jobs: {} };

  constructor(private config: ConfigService) {
    QueueMetadata.data = this.config.get('queue') as QueueOptions;
    const data = QueueMetadata.data;
    QueueMetadata.defaultOptions = {
      connection: data.default,
      queue: data.connections[data.default].queue as string,
      delay: 10,
      tries: 5,
      timeout: 30,
      sleep: 5000,
    };
  }

  static getDefaultOptions(): Record<string, any> {
    return QueueMetadata.defaultOptions;
  }

  static getData(): QueueOptions {
    return QueueMetadata.data;
  }

  static addJob(jobName: string, target: JobTarget): void {
    QueueMetadata.store.jobs[jobName] = target;
  }

  static getJob(jobName: string): JobTarget {
    return QueueMetadata.store.jobs[jobName];
  }
}
