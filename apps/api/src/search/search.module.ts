import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { AmadeusProvider, BookingProvider, VrboProvider, AirbnbProvider } from '@bounce/providers';
import { ScoringService, CacheModule, TransitService } from '@bounce/core';

@Module({
  imports: [CacheModule.forRoot()],
  controllers: [SearchController],
  providers: [
    SearchService,
    ScoringService,
    TransitService,
    AmadeusProvider,
    BookingProvider,
    VrboProvider,
    AirbnbProvider,
    {
      provide: 'PROVIDERS',
      useFactory: (
        a: AmadeusProvider,
        b: BookingProvider,
        v: VrboProvider,
        ab: AirbnbProvider,
      ) => [a, b, v, ab],
      inject: [AmadeusProvider, BookingProvider, VrboProvider, AirbnbProvider],
    },
  ],
})
export class SearchModule {}
