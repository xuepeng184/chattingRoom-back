import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('all')
  async findAll(){
    let res=await this.userService.findAll()
    // res.forEach(item=>{
    //   let {username,userPic,...result}=item
    //   item={username,userPic}
    // })
    let newRes=res.map(item=>{
      return {
        username:item.username,
        userPic:item.userPic
      }
    })
    return newRes
  }

  @Get('findme')
  async findMe(@Request() req){
    console.log(req.query);
    
    let result=await this.userService.findMe(req.query.username)
    return result
  }
}
