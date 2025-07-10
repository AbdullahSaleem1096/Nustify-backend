import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/roles/role.enum';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true, index: true, immutable: true })
  email: string;

  @Exclude()
  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true, enum: Role })
  role: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, enum: ['hostelite', 'dayscholar'] })
  residenceStatus: 'hostelite' | 'dayscholar';

  @Prop({
    required: true,
    enum: [
      'SINES',
      'SEECS',
      'SMME',
      'SNS',
      'NBS',
      'SCME',
      'NICE',
      'NIPCONS',
      'ASAB',
      'SADA',
      'NSTP',
      'RIMMES',
      'IAEC',
      'RIC',
      'Main Office',
    ],
  })
  department: string;

  @Prop({
    enum: [
      'rumi',
      'johar',
      'ghazali',
      'beruni',
      'razi',
      'rahmat',
      'attar',
      'liaquat',
      'hajveri',
      'zakariya',
      'fatima_I',
      'fatima_block_II',
      'fatima_block_III',
      'zainab',
      'ayesha',
      'khadija',
      'amna',
    ],
  })
  Hostel?: string;

  @Prop()
  RoomNumber?: number;

  @Prop({ default: 0 })
  wallet: number;

  //   @Prop()
  //   verifyToken?: string;

  //   @Prop()
  //   VerifyTokenExpiry?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
