import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Throttle,ThrottlerGuard } from '@nestjs/throttler';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(ThrottlerGuard)
    @Throttle({default:{ limit: 10, ttl: 3600000 }})
    @Post('login')
    async signIn(@Body(new ValidationPipe({groups:['login']})) loginUserDto:LoginUserDto) {
        return this.authService.signIn(loginUserDto);
      }
    
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}