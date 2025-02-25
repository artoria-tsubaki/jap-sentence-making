import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaService/prisma.service';
import { Grammar, Proficiency } from '@prisma/client';
import { GrammarDto } from './dto/grammar.dto';
import { ResultData } from 'src/interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GrammarService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private generateCacheKey(params: GrammarDto): string {
    return `grammar:${JSON.stringify(params)}`;
  }

  private getNextDayFourAM(): number {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(4, 0, 0, 0);
    
    // 如果当前时间是凌晨4点之前，就用今天的凌晨4点
    if (now.getHours() < 4) {
      tomorrow.setDate(tomorrow.getDate() - 1);
    }
    
    return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
  }

  async findGrammarWithCache(params: GrammarDto): Promise<ResultData<(Grammar & Proficiency)[]>> {
    const cacheKey = this.generateCacheKey(params);
    
    // 尝试从缓存获取数据
    const cachedData = await this.cacheManager.get<ResultData<(Grammar & Proficiency)[]>>(cacheKey);
    console.log(cachedData);
    if (cachedData) {
      return cachedData;
    }

    // 如果缓存中没有，从数据库获取
    const result = await this.findGrammar(params);
    
    // 设置缓存，过期时间为下一个凌晨4点
    if (result && result.code === 200) {
      await this.cacheManager.set(
        cacheKey,
        result,
        this.getNextDayFourAM() * 1000 // cache-manager需要毫秒
      );
    }

    return result;
  }

  async findGrammar({ level_id, limit, user_id, proficiency }: GrammarDto): Promise<ResultData<(Grammar & Proficiency)[]>> {
    let SQL = `
      SELECT g.*, p.id as proficiency_id, p.proficiency, n.id as note_id, n.content as note_content
      FROM Grammar g
      LEFT JOIN Note n ON g.id = n.grammar_id
      LEFT JOIN Proficiency p on g.id = p.grammar_id
      `
    if (user_id) {
      SQL += ` WHERE (n.user_id is null or n.user_id = ${user_id})`
    }
    if (proficiency) {
      // 可以传多个proficiency，用逗号分隔
      SQL += ` AND (p.proficiency is null or p.proficiency in (${proficiency}))`
    }
    if (level_id) {
      // 可以传多个level_id，用逗号分隔
      SQL += ` AND g.level_id in (${level_id})`
    }
    SQL += ` ORDER BY RAND()`
    if (limit) {
      SQL += ` LIMIT ${limit}`
    }
    console.log(SQL)
    const grammarList: (Grammar & Proficiency)[] = await this.prisma.$queryRawUnsafe(SQL);
    
    if(grammarList) {
      grammarList.forEach((item) => {
        item.proficiency = item.proficiency ?? "2"
      })
      return {
        code: 200,
        data: grammarList,
        msg: 'success'
      }
    }
  }
}
