import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  async createMessage(@Body() messageBody:CreateMessageDto){
    return await this.messageService.create(messageBody)
  }

  @Post("getlist")
  async getNowList(@Body() sendAndReceive){
    return await this.messageService.findAllMessage(sendAndReceive.sender,sendAndReceive.receiver)
  }
}
