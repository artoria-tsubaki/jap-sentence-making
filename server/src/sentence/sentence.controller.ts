import { Body, Controller, Post, Put } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { Result, Sentence } from 'src/interface';

@Controller('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}


  @Put('upset')
  async create(@Body() sentences: Sentence[]): Promise<Result> {
    return this.sentenceService.upsetSentence(sentences);
  }
}
