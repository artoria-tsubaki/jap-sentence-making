import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './Grammar.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [GrammarService, PrismaService],
  controllers: [GrammarController]
})
export class GrammarModule {}
