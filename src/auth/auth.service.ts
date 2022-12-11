import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //只启验证密码的作用
  //依据官网安全文档写的
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findMe(username);
    if (user) {
      const userPassword = await bcrypt.compare(pass, user.password);
      //这里的密码判断有问题，需要解码
      if (userPassword) {
        const { password, ...result } = user;
        //这里有console需要消除
        // console.log('auth service', result);
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    // console.log(user.username,'--------');
    //利用内置库传入用户名和id生成jwt
    const payload = { username: user.username, sub: user.id };
    return {
      user_token: this.jwtService.sign(payload),
    };
  }
}
