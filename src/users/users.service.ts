import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bycrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto'
import { MailService } from '../auth/email/send-verfication-email';
import { Cron, CronExpression } from '@nestjs/schedule'




@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService
) {}

  @Cron(CronExpression.EVERY_HOUR)
  async deleteUnverifiedUsers() {
    const result = await this.userModel.deleteMany({
      isVerified: false,
      VerifyTokenExpiry: { $lt: new Date() },
    });
    this.logger.log(`Deleted ${result.deletedCount} unverified users`);
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 24*60*60*1000);
    const saltOrRounds = 10;
    const hashedPassword = await bycrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );


    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      verifyToken,
      VerifyTokenExpiry:verifyTokenExpiry,
      isVerified: false
    });
    await this.mailService.sendVerificationEmail(createdUser.email,verifyToken)
    return await createdUser.save();
  }

  async verifyEmailToken(token:string):Promise<{message:string}>{
    const user = await this.userModel.findOne({
      verifyToken:token,
      VerifyTokenExpiry: {$gt: new Date()},
    });
    if(!user){
      throw new BadRequestException('Invalid or Expired token')
    };
    user.isVerified = true;
    user.verifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    await user.save();
    return {
      message: "email verified successfully"
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password -_id -__v');
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