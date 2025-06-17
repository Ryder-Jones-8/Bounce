import { Injectable, Inject } from '@nestjs/common';
import { searchDto, SearchDto } from './dto';
import { Provider } from '@bounce/providers';
import { ScoringService } from '@bounce/core';

@Injectable()
export class SearchService {
  constructor(
    @Inject('PROVIDERS') private readonly providers: Provider[],
    private readonly scoring: ScoringService,
  ) {}

  async search(options: SearchDto) {
    searchDto.parse(options);
    const results = await Promise.all(this.providers.map(p => p.search(options)));
    const listings = results.flat();
    const dedup = new Map<string, any>();
    for (const l of listings) {
      const key = `${l.lat}:${l.lon}:${l.name}`;
      if (!dedup.has(key)) dedup.set(key, l);
    }
    const unique = Array.from(dedup.values());
    const scored = unique.map(l => ({ ...l, score: this.scoring.score(l) }));
    scored.sort((a, b) => b.score.total - a.score.total);
    const [first, second, third, ...rest] = scored;
    return {
      highlights: [first, second, third].filter(Boolean),
      rest,
    };
  }
}
