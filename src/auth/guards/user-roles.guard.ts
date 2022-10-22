import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/auth.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles:String[] = this.reflector.get( META_ROLES , context.getHandler() );

    if( !validRoles ) return true;
    if( validRoles.length === 0 ) return true;

    const req  = context.switchToHttp().getRequest();
    const user = req.user as User;

    if( !user ) throw new BadRequestException('User not found');

    for (const role of user.role ) {
      if( validRoles.includes( role ) ) {
        return true;
      }
    }

    throw new ForbiddenException(`User ${ user.nombre } need a valid role: [${ validRoles }]`);
  }

}