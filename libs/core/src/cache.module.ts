import { Module, Global } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({})
export class CacheModule {
  static forRoot() {
    const url = process.env.REDIS_URL;
    if (url) {
      const client = createClient({ url });
      client.connect().catch(console.error);
      return {
        module: CacheModule,
        providers: [{ provide: 'CACHE', useValue: client }],
        exports: ['CACHE'],
      };
    }
    const store = new Map<string, any>();
    return {
      module: CacheModule,
      providers: [{ provide: 'CACHE', useValue: store }],
      exports: ['CACHE'],
    };
  }
}
