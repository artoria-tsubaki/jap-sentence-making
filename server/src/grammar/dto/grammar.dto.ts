import { IsOptional, IsNumber, IsString } from 'class-validator';

export class GrammarDto {
  @IsNumber()
  @IsOptional()
  user_id: number

  @IsString()
  @IsOptional()
  level_id?: string;

  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  proficiency?: string;
}