import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Grammar } from '@prisma/client';
import { GrammarDto } from './dto/grammar.dto';
import { ResultData } from 'src/interface';

@Injectable()
export class GrammarService {
  constructor(private prisma: PrismaService) { }

  async findGrammar({ level_id, limit }: GrammarDto): Promise<ResultData<Grammar[]>> {
    let SQL = `
      SELECT * FROM grammar
    `
    if (level_id) {
      SQL += ` WHERE level_id = ${level_id}`
    }
    if (limit) {
      SQL += ` LIMIT ${limit}`
    }
    const grammarList: Grammar[] = await this.prisma.$queryRawUnsafe(SQL);
    if(grammarList) {
      return {
        code: 200,
        data: grammarList,
        msg: 'success'
      }
    }
  }
}
