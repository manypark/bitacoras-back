import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports     : [
    AuthModule,
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
  ],
  controllers : [],
  providers   : [],
})

export class AppModule { }