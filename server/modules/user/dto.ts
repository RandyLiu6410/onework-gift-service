import { IUser, UserRole } from 'common/user';

export class CreateUserDto {
  username: string;
  displayName: string;
  balance: number;
  avatar?: string;
  role: UserRole;
}

export class UpdateUserDto {
  id: string;
  update: Partial<IUser>;
}

export class LoginDto {
  username: string;
  password: string;
}

export class TransferDto {
  from: string;
  to: string;
  amount: number;
}

export class AllotDto {
  to: string;
  amount: number;
}

export class WithdrawDto {
  from: string;
  amount: number;
}
