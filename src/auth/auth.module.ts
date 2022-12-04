import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ResponseService } from 'src/common/utils/response/response.service';

@Module({
  controllers : [
    AuthController
  ],
  providers   : [ 
    AuthService,
    ResponseService,
    JwtStrategy
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
        return {
            // secret      : configServices.get('JWT_SECRET'),
            secret      : 'misecretcodeparapassport20202',
            signOptions : { expiresIn: '30d' },
          }
      }
    }),
  ],
  exports     : [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
  ]
})
export class AuthModule {}
