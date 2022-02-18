import { IUser, User } from "@src/modules/users/models/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  public async insert(username: string, password: string): Promise<IUser> {
    const newUser = new User({ username, password });

    const user = await newUser.save();

    return user;
  }

  public async findOne(username: string): Promise<IUser | null> {
    const user = await User.findOne({ username }).exec();

    return user;
  }
}
