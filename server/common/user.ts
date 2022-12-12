export type UserRole = 'Admin' | 'User';

export interface IUser {
  username: string;
  password: string;
  displayName: string;
  balance: number;
  avatar?: string;
  role: UserRole;
}
