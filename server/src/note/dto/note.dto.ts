import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsNumber()
  id: number;

  @IsNumber()
  user_id: number;

  @IsString()
  note_content: string;

  @IsNumber()
  @IsOptional()
  grammar_id?: number;

  @IsNumber()
  @IsOptional()
  example_id?: number;
}