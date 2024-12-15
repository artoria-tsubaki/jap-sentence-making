import { Injectable } from '@nestjs/common';
import { Sentence } from '@prisma/client';
import { Result } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SentenceService {
  constructor(private prisma: PrismaService) {}

  async upsetSentence(sentences: Sentence[]): Promise<Result> {
    const result = await Promise.all(
      sentences.map((sentence) => {
        if(sentence.status) {
          sentence.status = '2' // 良好
        }
        if(sentence.id) {
          return this.prisma.sentence.upsert({
            where: {
              id: sentence.id,
            },
            update: sentence,
            create: sentence,
          })
        } else {
          return this.prisma.sentence.create({
            data: {
              user_id: sentence.user_id,
              example_id: sentence.example_id,
              jap_input: sentence.jap_input,
              status: sentence.status,
              priority: sentence.priority
            },
          })
        }
      })
    )
    if(result && result.length > 0) {
      return {
        code: 200,
        msg: 'success',
      }
    }
  }
}
