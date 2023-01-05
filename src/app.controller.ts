import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  //注册接口
  @Post('register')
  async register(@Body() UserDetails: LoginDto) {
    return await this.appService.register(UserDetails)
  }

  //使用passport的内置守卫启动
  //登录接口
  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Body() UserDetails: LoginDto) {
  //   console.log(UserDetails);
  //   // return this.authService.login(req.user);
  // }


  //登录接口
  // @UseGuards(AuthGuard('local'))  //内置守卫，会自动包装成一个user对象
  @Post('auth/login')
  async login(@Body() userDetails:LoginDto) {
    // console.log('------->', userDetails);
    return this.authService.login(userDetails);
  }

  @UseGuards(AuthGuard('myJwt'))
  @Get('refresh')
  async refresh(@Body() UserDetails: LoginDto){
    return this.authService.refreshToken()
  }
}
