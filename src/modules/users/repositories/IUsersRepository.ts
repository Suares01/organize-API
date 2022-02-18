import { IUser } from "../models/User";

export interface IUsersRepository {
  insert(username: string, password: string): Promise<IUser>;
  findOne(username: string): Promise<IUser | null>;
}
