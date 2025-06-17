import { Injectable } from '@nestjs/common';
import { Provider, SearchOptions, Listing } from './provider.interface';

/**
 * Airbnb provider stub noting partner API requirement.
 */
@Injectable()
export class AirbnbProvider implements Provider {
  async search(options: SearchOptions): Promise<Listing[]> {
    // Airbnb partner API access required
    return [];
  }
}
