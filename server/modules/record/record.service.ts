import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SocketService } from 'modules/socket.service';
import { Model } from 'mongoose';
import { CreateRecordDto } from './dto';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name)
    private recordModel: Model<Record>,
    private socketService: SocketService,
  ) {}

  async create(dto: CreateRecordDto) {
    const record = new this.recordModel(dto);
    await record.save();

    await this.socketService.broadcast(record);
    return record;
  }

  async getRecords() {
    return await this.recordModel.find({});
  }
}
