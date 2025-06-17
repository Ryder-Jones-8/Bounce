import { Injectable } from '@nestjs/common';
import { Provider, SearchOptions, Listing } from './provider.interface';

/**
 * Booking.com search via RapidAPI fallback.
 */
@Injectable()
export class BookingProvider implements Provider {
  async search(options: SearchOptions): Promise<Listing[]> {
    // TODO: integrate with RapidAPI booking API
    return [];
  }
}
