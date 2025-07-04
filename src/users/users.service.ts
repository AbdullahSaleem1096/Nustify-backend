import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bycrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );


    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async findOne(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new NotFoundException();
    }
    const isPasswordValid = await bycrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {sub: user._id, email: user.email};
    return {
        access_token: await this.jwtService.signAsync(payload),
    };
  }
}
