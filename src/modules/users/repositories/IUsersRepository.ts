import { IUser } from "@modules/users/models/User";

export interface IFindUser {
  username?: string | undefined;
  id?: string | undefined;
}

export interface IUsersRepository {
  insert(username: string, password: string): Promise<IUser>;
  findOne(data: IFindUser): Promise<IUser | null>;
}
