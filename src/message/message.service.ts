import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  //在数据库创建一条信息
  async create(messageDto:CreateMessageDto){
    let result=await this.messageModel.create({
      ...messageDto
    })
    // console.log('创建消息',result);
    if(result){
      return {
        code:200,
        message:`发送给${messageDto.receiver}的消息发送成功`
      }
    }
  }

  //找到这两个人相关的所有信息
  async findAllMessage(findSender,findReceiver){
    console.log(findSender,findReceiver);
    //在数据库中寻找这两个人的对话消息
    let result= await this.messageModel.findAll({
      where:{
        sender:findSender,
        receiver:findReceiver
      }
    })
    let result2=await this.messageModel.findAll({
      where:{
        sender:findReceiver,
        receiver:findSender
      }
    })
    return {
      code:200,
      data:[...result,...result2].sort((a,b)=>a.id-b.id)
    }
  }
}
