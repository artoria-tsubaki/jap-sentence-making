import { Controller, Get, Query } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { Grammar } from '@prisma/client';

@Controller('grammar')
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Get()
  async findGrammar(
    @Query('level_id') level_id: number,
  ): Promise<Grammar[]> {
    return this.grammarService.findGrammar(level_id);
  }
}
