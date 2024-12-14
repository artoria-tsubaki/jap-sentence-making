import { Body, Controller, Post, Put } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { Sentence } from '@prisma/client';
import { Result } from 'src/interface';

@Controller('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}


  @Put('upset')
  async create(@Body() sentences: Sentence[]): Promise<Result> {
    return this.sentenceService.upsetSentence(sentences);
  }
}
