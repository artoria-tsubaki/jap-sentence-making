import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaService/prisma.service';
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
      SELECT 
      e.id as example_id, e.grammar_id , e.japanese_sentence, e.chinese_translation, e.english_translation, 
      s.id as sentence_id, s.status, s.priority, s.jap_input, 
      l.level_name,
      n.id as note_id, n.content as note_content,
      g.grammar_point, g.explanation, g.href, g.meaning, g.connection, g.initial
      FROM Example e
      LEFT JOIN Sentence s ON e.id = s.example_id
      LEFT JOIN Note n ON e.id = n.example_id
      LEFT JOIN Grammar g ON e.grammar_id = g.id
      LEFT JOIN Level l ON g.level_id = l.id
    `

    const params: SqlParams[] = [
      {
        field: 'user_id',
        value: user_id,
        sql: `(s.user_id=${user_id} or s.user_id is null) AND (n.user_id=${user_id} or n.user_id is null)`
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
    const exampleList: (Example & Sentence)[] = await this.prisma.$queryRawUnsafe(SQL);

    exampleList.forEach(example => {
        example.status = example.status ?? '0'
        example.priority = example.priority ?? '1'
        example.jap_input = example.jap_input ?? ''
      }
    )

    if(exampleList) {
      return {
        code: 200,
        data: exampleList,
        msg: 'success'
      }
    }
  }
}
