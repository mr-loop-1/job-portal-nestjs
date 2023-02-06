import { JobOptions } from '@squareboat/nest-queue-strategy';

export interface Queueable {
  queueOptions(): JobOptions | JobOptions[];
}
