import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRecordDto } from './dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Get('all')
  async getRecords() {
    return await this.recordService.getRecords();
  }

  @Post()
  async create(@Body() body: CreateRecordDto) {
    return await this.recordService.create(body);
  }
}
