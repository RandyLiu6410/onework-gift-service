import request from "../request";
import { AllotDto, LoginDto, TransferDto, WithdrawDto } from "./dto";

export function login(body: LoginDto) {
  return request({
    url: "user/login",
    method: "POST",
    data: body,
  });
}

export function getUser(id: string) {
  return request({
    url: "user",
    method: "GET",
    params: { id },
  });
}

export function getUsers() {
  return request({
    url: "user/all",
    method: "GET",
  });
}

export function transfer(body: TransferDto) {
  return request({
    url: "user/transfer",
    method: "POST",
    data: body,
  });
}

export function allot(body: AllotDto) {
  return request({
    url: "user/allot",
    method: "POST",
    data: body,
  });
}

export function withdraw(body: WithdrawDto) {
  return request({
    url: "user/withdraw",
    method: "POST",
    data: body,
  });
}
