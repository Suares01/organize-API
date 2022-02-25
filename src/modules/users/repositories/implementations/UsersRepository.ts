import { IUser, User } from "@modules/users/models/User";
import {
  IFindUser,
  IUsersRepository,
} from "@modules/users/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  public async insert(username: string, password: string): Promise<IUser> {
    const newUser = new User({ username, password });

    const user = await newUser.save();

    return user;
  }

  public async findOne({ id, username }: IFindUser): Promise<IUser | null> {
    if (username) {
      const user = await User.findOne({ username }).exec();

      return user;
    }

    if (id) {
      const user = await User.findOne({ id }).exec();

      return user;
    }

    return null;
  }
}
