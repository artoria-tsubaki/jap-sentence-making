import { IsOptional, IsString } from 'class-validator';

export class FindExamplesDto {
  user_id: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  content?: string;
}