import { Injectable } from '@nestjs/common';
import { CreateProficiencyDto } from './dto/create-proficiency.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Result, ResultData } from 'src/interface';
import { Prisma, Proficiency } from '@prisma/client';

@Injectable()
export class ProficiencyService {
  constructor(private prisma: PrismaService) {}

  async upset(createProficiencyDto: CreateProficiencyDto): Promise<ResultData<Proficiency>> {
    if(createProficiencyDto.id) {
      const data =  await this.prisma.proficiency.update({
        where: {
          id: createProficiencyDto.id,
          user_id: createProficiencyDto.user_id
        } as Prisma.ProficiencyWhereUniqueInput,
        data: createProficiencyDto
      })
      if(data) {
        const result: any = data;
        result.proficiency_id = result.id;
        delete result.id;
        return {
          code: 200,
          data: result,
          msg: 'success'
        }
      } else {
        return {
          code: 500,
          data: null,
          msg: 'failed'
        }
      }
    } else {
      const data = await this.prisma.proficiency.create({
        data: createProficiencyDto
      })
      if(data) {
        const result: any = data;
        result.proficiency_id = result.id;
        delete result.id;
        return {
          code: 200,
          data: result,
          msg: 'success'
        }
      } else {
        return {
          code: 500,
          data: null,
          msg: 'failed'
        }
      }
    }
  }
}
