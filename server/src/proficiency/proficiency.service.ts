import { Injectable } from '@nestjs/common';
import { CreateProficiencyDto } from './dto/create-proficiency.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Result } from 'src/interface';
import { Proficiency } from '@prisma/client';

@Injectable()
export class ProficiencyService {
  constructor(private prisma: PrismaService) {}

  async upset(createProficiencyDto: CreateProficiencyDto): Promise<Proficiency> {
    if(createProficiencyDto.id) {
      return await this.prisma.proficiency.update({
        where: {
          id: createProficiencyDto.id
        },
        data: createProficiencyDto
      })
    } else {
      return await this.prisma.proficiency.create({
        data: createProficiencyDto
      })
    }
  }
}
