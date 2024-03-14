import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Global()
@Module({
  exports: [SocketGateway],
  providers: [SocketGateway],
})
export class SocketModule {}
