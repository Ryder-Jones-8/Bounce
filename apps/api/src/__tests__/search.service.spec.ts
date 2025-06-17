import { Test } from '@nestjs/testing';
import { SearchService } from '../search/search.service';
import { ScoringService } from '@bounce/core';
import { Provider, Listing } from '@bounce/providers';

class MockProvider implements Provider {
  async search(): Promise<Listing[]> {
    return [{ name: 'test', lat: 0, lon: 0, price: 100 }];
  }
}

describe('SearchService', () => {
  it('merges results', async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        ScoringService,
        { provide: 'PROVIDERS', useValue: [new MockProvider()] },
      ],
    }).compile();
    const service = module.get(SearchService);
    const result = await service.search({ location: 'x' });
    expect(result.highlights.length).toBeGreaterThan(0);
  });
});
