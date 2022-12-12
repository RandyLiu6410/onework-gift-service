import { IUser, UserRole } from "../../../common/user";

export interface CreateUserDto {
  username: string;
  displayName: string;
  balance: number;
  avatar?: string;
  role: UserRole;
}

export interface UpdateUserDto {
  id: string;
  update: Partial<IUser>;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface TransferDto {
  from: string;
  to: string;
  amount: number;
}

export interface AllotDto {
  to: string;
  amount: number;
}

export interface WithdrawDto {
  from: string;
  amount: number;
}
