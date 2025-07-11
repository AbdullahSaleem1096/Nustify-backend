import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Delete,
  Param,
  Patch,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { User } from './user.schema';



@Controller({path:'users',version:'1'})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('SignUp')
  @Roles(Role.Buyer,Role.Seller)
  async create(@Body(new ValidationPipe({groups:['create']})) createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @Get('all-users')
  async findAll():Promise<User[]> {
    const users = await this.usersService.findAll();
    return users
  }

  @Patch('update/:id')
  @Roles(Role.Buyer,Role.Seller)
  @UseGuards(AuthGuard)
  async updateUser(
    @Req() req,
    @Body(new ValidationPipe({groups:['update']})) updateUserDto: UpdateUserDto):Promise<User>{
        return this.usersService.updateUser(req.user.sub, updateUserDto)
    }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Roles(Role.Buyer, Role.Seller)
  login(@Body() loginUserDto: LoginUserDto):Promise<User|undefined> {
    return this.usersService.findOne(loginUserDto);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token:string): Promise<{message:string}>{
    return this.usersService.verifyEmailToken(token);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  async deleteUser(@Param('id')id:string):Promise<{message:string}>{
    return this.usersService.deleteUser(id);
  }
}