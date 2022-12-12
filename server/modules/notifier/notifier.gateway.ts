import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';

@WebSocketGateway(12251, {
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: { origin: '*' },
})
export class NotifierGateway {
  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    return {
      event: 'hello',
      data: data,
      msg: 'rustfisher.com',
    };
  }

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    client.send(JSON.stringify({ event: 'tmp', data: '這裡是個臨時資訊' }));
    return { event: 'hello2', data: data };
  }
}
