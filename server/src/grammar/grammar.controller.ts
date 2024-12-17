import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { Grammar } from '@prisma/client';
import { ResultData } from '../interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('grammar')
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findGrammar(
    @Query('level_id') level_id: string,
    @Query('limit') limit: string,
    @Query('user_id') user_id: string
  ): Promise<ResultData<Grammar[]>> {
    return this.grammarService.findGrammar({ level_id, limit, user_id: Number(user_id) });
  }
}
