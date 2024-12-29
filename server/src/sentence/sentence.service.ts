import { Injectable } from '@nestjs/common';
import { Result, Sentence } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SentenceService {
  constructor(private prisma: PrismaService) {}

  async upsetSentence(sentences: Sentence[]): Promise<Result> {
    const result = await Promise.all(
      sentences.map((sentence) => {
        if(!sentence.status) {
          sentence.status = '2' // 良好
        }
        console.log(sentence, sentence.sentence_id)
        if(sentence.sentence_id) {
          return this.prisma.sentence.update({
            where: {
              id: sentence.sentence_id,
            },
            data: {
              user_id: sentence.user_id,
              example_id: sentence.example_id,
              jap_input: sentence.jap_input,
              status: sentence.status,
              priority: sentence.priority
            }
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
