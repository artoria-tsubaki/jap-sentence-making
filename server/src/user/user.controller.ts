// src/user/user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto'
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    console.log('findAllUsers');
    
    return this.userService.findAllUsers();
  }
}
