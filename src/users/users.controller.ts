import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('SignUp')
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }
  @Get('all-users')
  async findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.findOne(loginUserDto);
  }
}
