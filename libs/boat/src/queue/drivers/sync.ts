import {
  DriverJob,
  InternalMessage,
  QueueDriver,
} from '@squareboat/nest-queue-strategy';
import { QueueMetadata } from '../metadata';

export class SyncQueueDriver implements QueueDriver {
  async push(message: string, rawPayload: InternalMessage): Promise<void> {
    console.log(
      '🚀 ~ file: sync.ts:10 ~ SyncQueueDriver ~ push ~ rawPayload:',
      rawPayload,
    );
    const job = QueueMetadata.getJob(rawPayload.job);
    console.log('🚀 ~ file: sync.ts:15 ~ SyncQueueDriver ~ push ~ job:', job);
    job.target(rawPayload.data);
    return;
  }

  async pull(options: Record<string, any>): Promise<DriverJob | null> {
    return null;
  }

  async remove(job: DriverJob, options: Record<string, any>): Promise<void> {
    return;
  }

  async purge(options: Record<string, any>): Promise<void> {
    return;
  }

  async count(options: Record<string, any>): Promise<number> {
    return 0;
  }
}
