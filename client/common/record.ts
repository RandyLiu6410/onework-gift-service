export type RecordType = "Transfer" | "Allot" | "Withdraw" | "Notify";

export interface IRecord {
  type: RecordType;
  from?: string;
  to?: string;
  amount?: number;
  msg?: string;
  createdAt: string;
}
