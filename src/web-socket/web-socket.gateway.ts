import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(8010,{
  cors:{
    origin:'*'
  }
})
export class MyWebSocketGateway {
  @SubscribeMessage('getmessage')
  sendMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    console.log('接收到了');
    //发给自己
    client.emit('showMessage');
    //发给自己以外的其他
    client.broadcast.emit('showMessage')
    return;
  }

  //这是官网的测试案例，用来测试
  // @SubscribeMessage('connection')
  // handleEvent(
  //   @MessageBody() data,
  //   @ConnectedSocket() client: Socket,
  // ): WsResponse<unknown>{
  //   //连接的用户加入房间
  //   client.join(data.name)
  //   return 
  // }
}
