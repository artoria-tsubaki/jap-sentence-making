// src/user/user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto'
import { User } from '@prisma/client';
import { Result } from 'src/interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() userDto: UserDto): Promise<Result> {
    return this.userService.createUser(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {    
    return this.userService.findAllUsers();
  }
}
