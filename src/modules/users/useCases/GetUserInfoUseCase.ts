import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/users/models/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
export class GetUserInfoUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(userID: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({ id: userID });

    return user as IUser;
  }
}
