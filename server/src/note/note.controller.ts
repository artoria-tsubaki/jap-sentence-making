import { Body, Controller, Post } from '@nestjs/common';
import { Result } from 'src/interface';
import { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('create')
  async create(@Body() noteDto: NoteDto): Promise<Result> {
    return this.noteService.createNote(noteDto);
  }
}
