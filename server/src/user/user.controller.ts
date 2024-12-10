// src/user/user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: { username: string; password: string; email: string }): Promise<User> {
    return this.userService.createUser(userData.username, userData.password, userData.email);
  }

  @Get()
  async findAll(): Promise<User[]> {
    console.log('findAllUsers');
    
    return this.userService.findAllUsers();
  }
}
