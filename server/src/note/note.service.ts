import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(note: NoteDto) {
    // TODO: add validation
    if(!note.grammar_id && !note.example_id) {
      return {
        code: 500,
        msg: 'Either grammar_id or example_id must be provided'
      }
    }
    const data: Prisma.NoteUncheckedCreateInput = {
      content: note.note_content,
      user_id: note.user_id,
    }
    if(note.grammar_id) {
      data.grammar_id = note.grammar_id;
    }
    if(note.example_id) {
      data.example_id = note.example_id;
    }
    const newNote = await this.prisma.note.create({
      data
    });
    if(newNote) {
      return {
        code: 200,
        msg: 'Note created successfully',
        data: newNote.id
      }
    }
  }
}
