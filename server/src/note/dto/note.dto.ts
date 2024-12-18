import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsNumber()
  user_id: number;

  @IsString()
  content: string;

  @IsNumber()
  @IsOptional()
  grammar_id?: number;

  @IsNumber()
  @IsOptional()
  example_id?: number;

  @IsOptional()
  @IsString()
  email?: string;
}