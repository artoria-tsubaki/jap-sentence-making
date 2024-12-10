import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './Example.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ExampleService, PrismaService],
  controllers: [ExampleController]
})
export class ExampleModule {}
