import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  async createMessage(@Body() messageBody:CreateMessageDto){
    return await this.messageService.create(messageBody)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("getlist")
  async getNowList(@Body() sendAndReceive){
    return await this.messageService.findAllMessage(sendAndReceive.sender,sendAndReceive.receiver)
  }
}
