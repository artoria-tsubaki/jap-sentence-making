import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Example, Sentence } from '@prisma/client';
import { FindExamplesDto } from './dto/find-examples.dto';

@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) {}

  async findExample(findExamplesDto: FindExamplesDto): Promise<Example[] & Sentence[]> {
    const { content, status, user_id } = findExamplesDto;
    let SQL = `
      SELECT e.*, s.status
      FROM example e
      INNER JOIN sentence s ON e.id = s.example_id
      WHERE s.user_id=${user_id}
    `
    if(status && status !== '0') {
      SQL += ` AND s.status = ${status}`
    }
    if(content && content.trim() !== '') {
      SQL += ` 
        AND (
          e.english_translation LIKE CONCAT('%', '${content}','%') 
          OR e.japanese_sentence LIKE CONCAT('%', '${content}', '%') 
          OR e.chinese_translation LIKE CONCAT('%', '${content}', '%')
          OR s.jap_input LIKE CONCAT('%', '${content}', '%')
        )
      `
    }
    return await this.prisma.$queryRawUnsafe(SQL);
  }
}
