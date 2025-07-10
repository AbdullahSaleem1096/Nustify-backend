import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://abdullahsaleem1096:b6mhDCNmPfzvDXL9@cluster0.to1ug79.mongodb.net/nestJS',
    ),
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers:[
        {
          ttl:60000,
          limit:10
        }
      ]
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}