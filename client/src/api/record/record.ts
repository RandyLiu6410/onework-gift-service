import request from "../request";
import { CreateRecordDto } from "./dto";

export function getRecords() {
  return request({
    url: "record/all",
    method: "GET",
  });
}

export function createRecord(body: CreateRecordDto) {
  return request({
    url: "record",
    method: "POST",
    data: body,
  });
}
