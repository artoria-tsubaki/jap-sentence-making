// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Result } from '../interface'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: UserDto): Promise<Result> {
    const { username, password, email } = userDto;
    // 先判断是否已经存在此用户名的用户
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (existingUser) {
      return {
        code: 400,
        msg: '用户名已存在',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email: email || '',
      },
    });

    if(newUser) {
      return {
        code : 200,
        msg: '注册成功',
      }
    }
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByUsername(name: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username: name,
      }
    });
  }
}
