import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoMonitorService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    this.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    this.connection.on('error', (error) => {
      console.error('MongoDB connection error: ', error);
    });
  }
}
