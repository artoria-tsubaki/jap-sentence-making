import { Body, Controller, Delete, Param, Post, Put, Query } from '@nestjs/common';
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

  @Put('update')
  async update(@Body() noteDto: NoteDto): Promise<Result> {
    return this.noteService.updateNote(noteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Result> {
    return this.noteService.deleteNote(parseInt(id));
  }  
}
