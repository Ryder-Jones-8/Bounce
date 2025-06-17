import { Injectable } from '@nestjs/common';
import { Provider, SearchOptions, Listing } from './provider.interface';

/**
 * Simple wrapper around Amadeus hotel search API.
 */
@Injectable()
export class AmadeusProvider implements Provider {
  async search(options: SearchOptions): Promise<Listing[]> {
    // TODO: integrate with Amadeus SDK
    return [];
  }
}
