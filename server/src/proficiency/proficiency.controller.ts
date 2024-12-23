import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { CreateProficiencyDto } from './dto/create-proficiency.dto';

@Controller('proficiency')
export class ProficiencyController {
  constructor(private readonly proficiencyService: ProficiencyService) {}

  @Post()
  upset(@Body() createProficiencyDto: CreateProficiencyDto) {
    return this.proficiencyService.upset(createProficiencyDto);
  }
}
