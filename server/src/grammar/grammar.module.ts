import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AppRedisModule } from '../redis/redis.module';

@Module({
  imports: [AppRedisModule],
  providers: [GrammarService, PrismaService],
  controllers: [GrammarController]
})
export class GrammarModule {}
