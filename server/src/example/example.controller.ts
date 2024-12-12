import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindExamplesDto } from './dto/find-examples.dto';
import { ExampleService } from './example.service';
import { Example, Sentence } from '@prisma/client';
import { ResultData } from 'src/interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('findExample')
  @UseGuards(AuthGuard)
  async findExample(@Query() findExamplesDto: FindExamplesDto): Promise<ResultData<(Example & Sentence)[]>> {
    return this.exampleService.findExample(findExamplesDto);
  }
}
