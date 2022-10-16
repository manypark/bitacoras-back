import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { ResponseService } from 'src/common/utils/response/response.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers : [AuthController],
  providers   : [ 
    AuthService,
    ResponseService
  ],
  imports     : [
    ConfigModule,
    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports : [ ConfigModule, ConfigModule ],
      inject  : [ ConfigService ],
      useFactory: ( configServices : ConfigService ) => {
        // secret      : process.env.JWT_SECRET,
        return {
            secret      : configServices.get('JWT_SECRET'),
            signOptions : { expiresIn: '1h' },
          }
      }
    }),
  ],
  exports     : [
    TypeOrmModule
  ]
})
export class AuthModule {}
