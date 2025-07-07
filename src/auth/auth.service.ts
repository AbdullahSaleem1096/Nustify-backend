import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async signIn(loginUserDto : LoginUserDto): Promise<{access_token: string}> {
        const user = await this.usersService.findOne(loginUserDto);
        if(user){
            const isPasswordValid = await bycrypt.compare(
                loginUserDto.password,
                user.password,
            );
            if (!isPasswordValid) {
                throw new UnauthorizedException();
            }
            const payload = {
                sub: user._id,
                email: user.email,
                role: user.role
            };
            return {
              access_token: await this.jwtService.signAsync(payload),
            };
        }
        return {
            access_token: ""
        }
    }
}
