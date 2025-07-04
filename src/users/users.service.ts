import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose'
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Mode } from 'fs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
