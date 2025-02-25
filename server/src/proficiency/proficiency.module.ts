import { Module } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { ProficiencyController } from './proficiency.controller';
import { PrismaService } from 'src/prismaService/prisma.service';

@Module({
  controllers: [ProficiencyController],
  providers: [ProficiencyService, PrismaService]
})
export class ProficiencyModule {}
