import { Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SentenceController],
  providers: [SentenceService, PrismaService]
})
export class SentenceModule {}
