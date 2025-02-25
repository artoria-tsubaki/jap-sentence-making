import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './Example.controller';
import { PrismaService } from '../prismaService/prisma.service';

@Module({
  providers: [ExampleService, PrismaService],
  controllers: [ExampleController]
})
export class ExampleModule {}
