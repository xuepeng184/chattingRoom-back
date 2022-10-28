import { Module } from '@nestjs/common';
import { MyWebSocketGateway } from './web-socket.gateway';

@Module({
  providers: [MyWebSocketGateway]
})
export class WebSocketModule {}
