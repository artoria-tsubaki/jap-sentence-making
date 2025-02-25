import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './Grammar.controller';
import { PrismaService } from '../prismaService/prisma.service';
import { AppRedisModule } from '../redis/redis.module';

@Module({
  imports: [AppRedisModule],
  providers: [GrammarService, PrismaService],
  controllers: [GrammarController]
})
export class GrammarModule {}
