import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Example, Sentence } from '@prisma/client';
import { FindExamplesDto } from './dto/find-examples.dto';
import { concatSqlWhereParams } from '../utils'
import { ResultData, SqlParams } from 'src/interface';

@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) {}

  async findExample(findExamplesDto: FindExamplesDto): Promise<ResultData<(Example & Sentence)[]>> {
    const { content, status, user_id, grammar_id } = findExamplesDto;
    let SQL = `
      SELECT e.*, s.status
      FROM example e
      LEFT JOIN sentence s ON e.id = s.example_id
    `

    const params: SqlParams[] = [
      {
        field: 'user_id',
        value: user_id,
        sql: `s.user_id=${user_id}`
      },
      {
        field: 'grammar_id',
        value: grammar_id,
        sql: `e.grammar_id=${grammar_id}`
      },
      {
        field: 'status',
        value: status,
        sql: `s.status=${status}`
      },
      {
        field: "content",
        value: content,
        sql: `(
          e.english_translation LIKE CONCAT('%', '${content}','%') 
          OR e.japanese_sentence LIKE CONCAT('%', '${content}', '%') 
          OR e.chinese_translation LIKE CONCAT('%', '${content}', '%')
          OR s.jap_input LIKE CONCAT('%', '${content}', '%')
        )`
      }
    ]
    SQL += concatSqlWhereParams(params)
    console.log(SQL)
    const exampleList: (Example & Sentence)[] = await this.prisma.$queryRawUnsafe(SQL);

    if(exampleList) {
      return {
        code: 200,
        data: exampleList,
        msg: 'success'
      }
    }
  }
}
