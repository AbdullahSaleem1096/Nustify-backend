import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('SignUp')
    async create(@Body() createUserDto: CreateUserDto){
        this.usersService.create(createUserDto)
    }
    @Get('all-users')
    async findAll(){
        return this.usersService.findAll()
    }
}
