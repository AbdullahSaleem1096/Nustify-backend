import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Delete,
  Param
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';



@Controller('users')
@UseGuards(AuthGuard,RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Post('SignUp')
  @Roles(Role.Buyer,Role.Seller)
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @Get('all-users')
  async findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Roles(Role.Buyer, Role.Seller)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.findOne(loginUserDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  async deleteUser(@Param('id')id:string){
    return this.usersService.deleteUser(id);
  }
}