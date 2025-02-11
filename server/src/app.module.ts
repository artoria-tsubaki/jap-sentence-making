import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { GrammarModule } from './grammar/grammar.module';
import { ExampleService } from './example/example.service';
import { ExampleController } from './example/example.controller';
import { ExampleModule } from './example/example.module';
import { AuthModule } from './auth/auth.module';
import { SentenceModule } from './sentence/sentence.module';
import { NoteModule } from './note/note.module';
import { ProficiencyModule } from './proficiency/proficiency.module';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [UserModule, GrammarModule, ExampleModule, AuthModule, SentenceModule, NoteModule, ProficiencyModule],
  controllers: [AppController, ExampleController],
  providers: [AppService, PrismaService, ExampleService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes("*");   
  }
}
