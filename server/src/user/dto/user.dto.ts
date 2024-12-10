import { IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  email?: string;
}