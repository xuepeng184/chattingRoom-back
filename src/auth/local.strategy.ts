import {Strategy} from 'passport-local'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
  export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
      super()
    }

    async validate(username:string,password:string){
      // console.log(username,password);
      console.log('我启用了');
      const user=await this.authService.validateUser(username,password);
      console.log(user);
      if(!user){
        throw new UnauthorizedException()
      }
      return user
    }
  }
