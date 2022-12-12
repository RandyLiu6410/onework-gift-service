import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { IRecord } from 'common/record';
import { RecordService } from 'modules/record/record.service';

export class NotifierAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) {}
  wsCLients: WebSocket[] = [];
  rooms: { [key: string]: WebSocket[] } = {};

  broadcastMessage(msg: IRecord) {
    for (const _client of this.wsCLients) {
      _client.send(JSON.stringify(msg));
    }
  }

  create(port: number, options: any = {}): any {
    console.log('ws create');
    return new WebSocket.Server({ port, ...options });
  }

  bindClientConnect(server, callback: () => void) {
    console.log('ws bindClientConnect, server:\n', server);
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    console.log('[wsAdapter]有新的連線進來');
    this.wsCLients.push(client);
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) =>
          this.bindMessageHandler(client, data, handlers, process),
        ),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    client: WebSocket,
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    let message = null;
    try {
      message = JSON.parse(buffer.data);
      this.resolveMessageHandler(message, client);
    } catch (error) {
      console.log('ws解析json出錯', error);
      return EMPTY;
    }
    const messageHandler = handlers.find(
      (handler) => handler.message === message.event,
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server) {
    console.log('ws server close');
    server.close();
  }

  resolveMessageHandler(message: any, client: WebSocket) {
    const notification = message as IRecord;

    for (const _client of this.wsCLients) {
      _client.send(JSON.stringify(message));
    }
  }
}
