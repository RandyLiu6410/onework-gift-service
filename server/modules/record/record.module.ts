import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketService } from 'modules/socket.service';
import { RecordController } from './record.controller';
import { Record, RecordSchema } from './record.entity';
import { RecordService } from './record.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  controllers: [RecordController],
  providers: [RecordService, SocketService],
  exports: [RecordService],
})
export class RecordModule {}
