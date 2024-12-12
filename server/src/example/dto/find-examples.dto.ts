import { IsOptional, IsString } from 'class-validator';

export class FindExamplesDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  grammar_id?: string;

  @IsOptional()
  @IsString()
  content?: string;
}