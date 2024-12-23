import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Grammar, Proficiency } from '@prisma/client';
import { GrammarDto } from './dto/grammar.dto';
import { ResultData } from 'src/interface';

@Injectable()
export class GrammarService {
  constructor(private prisma: PrismaService) { }

  async findGrammar({ level_id, limit, user_id }: GrammarDto): Promise<ResultData<(Grammar & Proficiency)[]>> {
    let SQL = `
      SELECT g.*, p.id as proficiency_id, p.proficiency, n.id as note_id, n.content as note_content
      FROM grammar g
      LEFT JOIN note n ON g.id = n.grammar_id
      LEFT JOIN proficiency p on g.id = p.grammar_id
    `
    if (user_id) {
      SQL += ` WHERE (n.user_id is null or n.user_id = ${user_id})`
    }
    if (level_id) {
      SQL += ` AND g.level_id = ${level_id}`
    }
    if (limit) {
      SQL += ` LIMIT ${limit}`
    }
    const grammarList: (Grammar & Proficiency)[] = await this.prisma.$queryRawUnsafe(SQL);
    
    if(grammarList) {
      grammarList.forEach((item) => {
        item.proficiency = item.proficiency ?? "0"
      })
      return {
        code: 200,
        data: grammarList,
        msg: 'success'
      }
    }
  }
}
