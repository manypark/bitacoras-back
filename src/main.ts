import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors( new ResponseInterceptor() );
  // app.setGlobalPrefix(process.env.PREFIX || 'v1/api');
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist           : true,
      forbidNonWhitelisted: true
    })
  );

  const PORT = process.env.PORT || 3000;
  await app.listen( PORT );
  console.log('app listen in port: ', PORT );
}
bootstrap();
