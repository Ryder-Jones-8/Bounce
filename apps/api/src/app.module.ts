import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { SearchModule } from './search/search.module';
import { CacheModule } from '@bounce/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 30 }),
    CacheModule.forRoot(),
    HealthModule,
    SearchModule,
  ],
})
export class AppModule {}
