import { Injectable } from '@nestjs/common';

/**
 * Simplified Google Distance Matrix wrapper with optional GTFS cache.
 */
@Injectable()
export class TransitService {
  async distance(origin: string, dest: string): Promise<number> {
    // TODO: call Google Distance Matrix API
    return 0;
  }
}
