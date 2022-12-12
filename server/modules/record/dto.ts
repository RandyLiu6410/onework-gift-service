import { RecordType } from 'common/record';

export class CreateRecordDto {
  type: RecordType;
  from?: string;
  to?: string;
  amount?: number;
  msg?: string;
}
