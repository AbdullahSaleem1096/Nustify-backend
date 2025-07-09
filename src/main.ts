import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true,
      transform:true,
      stopAtFirstError:false,
      errorHttpStatusCode:422,
      exceptionFactory: (error)=>{
        throw new UnprocessableEntityException({
          message: "validation failed",
          errors: error.map(e=>({
            field: e.property,
            messages: Object.values(e.constraints || {})
          }))
        });
      },
      validationError: {
        target:false,
        value: false
      }
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();