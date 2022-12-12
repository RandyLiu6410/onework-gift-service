import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRecord, RecordType } from 'common/record';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema({ timestamps: true })
export class Record implements IRecord {
  @Prop({ required: true, type: String })
  type: RecordType;

  @Prop({ required: false })
  from?: string;

  @Prop({ required: false })
  to?: string;

  @Prop({ required: false })
  amount?: number;

  @Prop({ required: false })
  msg?: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
