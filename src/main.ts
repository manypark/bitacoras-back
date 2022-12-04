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

  await app.listen( 3000 );
  console.log('app listen in port: ', 3000 );
}
bootstrap();
