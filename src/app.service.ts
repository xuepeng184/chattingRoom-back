import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user/users.model';
@Injectable()
export class AppService {
  constructor(@InjectModel(User) private userModel:typeof User){

  }

  async register(user){
    const myHash=await bcrypt.hash(user.password,10)
    const existUser=await this.userModel.findOne({
      where:{
        username:user.username
      }
    })
    if(!existUser){
      await this.userModel.create({
        username:user.username,
        password:myHash,
        userPic:user.userPic
      })
      return {
        code:200,
        message:'用户注册成功'
      }
    }else{
      return {
        code:200,
        message:'用户已经存在'
      }
    }
  }
}
