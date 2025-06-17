import { Injectable } from '@nestjs/common';
import { Listing } from '@bounce/providers';

export interface ListingScore {
  value: number;
  transit: number;
  service: number;
  total: number;
}

@Injectable()
export class ScoringService {
  /** Compute weighted score for a listing. */
  score(listing: Listing): ListingScore {
    const value = listing.price ? 1000 / listing.price : 0;
    const transit = (listing as any).transit || 0;
    const service = (listing as any).service || 0;
    const total = value + transit + service;
    return { value, transit, service, total };
  }
}
