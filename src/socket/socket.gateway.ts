import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transport: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: 'socket',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`New client ${client.id} joined ${client.id}.`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('accept')
  accepting(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    console.log(payload);

    this.server.emit('boradcast', payload);
  }
}
