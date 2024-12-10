import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Grammar } from '@prisma/client';

@Injectable()
export class GrammarService {
  constructor(private prisma: PrismaService) { }

  async findGrammar(level_id: number): Promise<Grammar[]> {
    return this.prisma.grammar.findMany({
      where: {
        level_id: {
          equals: Number(level_id)
        }
      }
    });
  }
}
