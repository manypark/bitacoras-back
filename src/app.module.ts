import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HomeworkModule } from './homework/homework.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports     : [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type        : 'postgres',
      host        : 'containers-us-west-104.railway.app',
      port        : 6007,
      database    : 'railway',
      username    : 'postgres',
      password    : 'fboHUTubroDp5nW5aY9I',
      synchronize : true,
      autoLoadEntities: true,
    }),
    
    AuthModule,
    
    UserModule,
    
    HomeworkModule,
    
    LogsModule,
  ],
  controllers : [],
  providers   : [],
})

export class AppModule { }