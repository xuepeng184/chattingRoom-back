import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import {User} from './users.model'

@Injectable()
export class UserService {
  //利用了sequelize的修饰器将这个model注册到这个serveice中，就可以使用相关方法
  constructor(@InjectModel(User) private UserModel: typeof User){
    
  }
  //创建实例
  async create(createUserDto: CreateUserDto) {
    let userIns=await this.UserModel.create({
      ...createUserDto
    })
    console.log('已创建一个用户');
    return userIns
  }

  //寻找一个用户
  async findMe(username:string){
    let result= await this.UserModel.findOne({
      where:{
        username
      }
    })
    return result || null
  }

  //寻找所有用户
  async findAll(){
    return await this.UserModel.findAll()
  }

  //更新用户头像
  async updatePic(username:string,userPic:string){
    let result= await this.UserModel.update({userPic},{where:{username:username}})
    if(result){
      return {
        code:200,
        message:'修改成功'
      }
    }else{
      console.error('修改图片失败');
      
    }
  }
}
