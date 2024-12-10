import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { GrammarModule } from './grammar/grammar.module';
import { ExampleService } from './example/example.service';
import { ExampleController } from './example/example.controller';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [UserModule, GrammarModule, ExampleModule],
  controllers: [AppController, ExampleController],
  providers: [AppService, PrismaService, ExampleService],
})
export class AppModule {}
