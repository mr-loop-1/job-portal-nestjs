import { Injectable } from '@nestjs/common';
import { QueueOptions } from './interfaces';
import { QueueMetadata } from './metadata';
import { QueueDriver } from '@squareboat/nest-queue-strategy';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class QueueService {
  private options: QueueOptions;
  private static connections: Record<string, any> = {};

  constructor(private config: ConfigService) {
    this.options = config.get('queue');
    for (const connName in this.options.connections) {
      const connection = this.options.connections[connName];
      const driver: any = connection.driver;
      QueueService.connections[connName] = new driver(connection);
    }
  }

  static getConnection(connection: string | undefined): QueueDriver {
    const options = QueueMetadata.getData();
    if (!connection) connection = options.default;
    return QueueService.connections[connection];
  }
}
