export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  age?: number;
  isActive: boolean;
}