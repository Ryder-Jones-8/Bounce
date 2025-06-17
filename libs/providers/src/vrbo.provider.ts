import { Injectable } from '@nestjs/common';
import { Provider, SearchOptions, Listing } from './provider.interface';

/**
 * Stubbed VRBO provider returning mock data.
 */
@Injectable()
export class VrboProvider implements Provider {
  async search(options: SearchOptions): Promise<Listing[]> {
    return [
      { name: 'VRBO Sample', lat: 0, lon: 0, price: 100 },
    ];
  }
}
