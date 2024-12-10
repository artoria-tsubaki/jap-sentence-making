import { Controller, Get, Query } from '@nestjs/common';
import { FindExamplesDto } from './dto/find-examples.dto';
import { ExampleService } from './example.service';
import { Example, Sentence } from '@prisma/client';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('findExample')
  async findExample(@Query() findExamplesDto: FindExamplesDto): Promise<Example[] & Sentence[]> {
    return this.exampleService.findExample(findExamplesDto);
  }
}
