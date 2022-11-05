import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HomeworkModule } from './homework/homework.module';

@Module({
  imports     : [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type        : 'postgres',
      host        : process.env.DB_HOST,
      port        : +process.env.DB_PORT,
      database    : process.env.DB_NAME,
      username    : process.env.DB_USERNAME,
      password    : process.env.DB_PASSWORD,
      synchronize : true,
      autoLoadEntities: true,
    }),
    
    AuthModule,
    
    UserModule,
    
    HomeworkModule,
  ],
  controllers : [],
  providers   : [],
})

export class AppModule { }