import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/users/models/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(username: string, password: string): Promise<IUser> {
    const user = await this.usersRepository.insert(username, password);

    return user;
  }
}
