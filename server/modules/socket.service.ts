import { Injectable } from '@nestjs/common';
import { IRecord } from 'common/record';

var WebSocketClient = require('websocket').client;

@Injectable()
export class SocketService {
  async broadcast(record: IRecord) {
    const wsUrl = `ws://${process.env.HOST}:${process.env.WSPORT}`;
    const client = new WebSocketClient();

    client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function (connection) {
      connection.send(JSON.stringify(record));
    });
    client.connect(wsUrl, 'echo-protocol');
  }
}
