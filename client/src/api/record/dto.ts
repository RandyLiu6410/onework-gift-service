import { RecordType } from "../../../common/record";

export interface CreateRecordDto {
  type: RecordType;
  from?: string;
  to?: string;
  amount?: number;
  msg?: string;
}
