import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bycrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
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


  async findOne(loginUserDto: LoginUserDto): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteUser(userId: string): Promise<{message:string}> {
    const result = await this.userModel.findByIdAndDelete(userId);
    if(!result){
        throw new NotFoundException(`User not found`)
    }
    return {
        message: "User deleted successfully"
    }
  }

  async updateUser(userId: string, updateUserDto:UpdateUserDto): Promise<User>{
    const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        updateUserDto,
        {new:true}
    );
    if(!updatedUser){
        throw new NotFoundException(`User not found exception`);
    }
    return updatedUser;
  }
}
