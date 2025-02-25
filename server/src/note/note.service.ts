import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prismaService/prisma.service';
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

  async updateNote(note: NoteDto) {
    // TODO: add validation
    const updatedNote = await this.prisma.note.update({
      where: {
        id: note.id
      },
      data: {
        content: note.note_content
      }
    });
    if(updatedNote) {
      return {
        code: 200,
        data: note.id,
        msg: 'Note updated successfully'
      }
    } else {
      return {
        code: 500,
        msg: 'Failed to update note'
      }
    }
  }

  async deleteNote(noteId: number) {
    const deletedNote = await this.prisma.note.delete({
      where: {
        id: noteId
      }
    });
    if(deletedNote) {
      return {
        code: 200,
        msg: 'Note deleted successfully'
      }
    } else {
      return {
        code: 500,
        msg: 'Failed to delete note'
      }
    }
  }
}
