import { IsOptional, IsString } from 'class-validator';

export class GrammarDto {
  @IsString()
  @IsOptional()
  level_id?: string;

  @IsString()
  @IsOptional()
  limit?: string;
}