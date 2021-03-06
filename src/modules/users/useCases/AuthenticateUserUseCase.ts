import { inject, injectable } from "tsyringe";

import { IUserDto } from "@modules/users/dtos/IUserDto";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UnauthorizedError } from "@shared/errors/internalErrors/UnauthorizedError";
import { compareData } from "@shared/util/hash";
import { generateJwt } from "@shared/util/token";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, password }: IUserDto): Promise<string> {
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedError("username or password incorrect");

    const verifyUserPass = await compareData(password, user.password);

    if (!verifyUserPass)
      throw new UnauthorizedError("username or password incorrect");

    const token = await generateJwt(
      {
        username: user.username,
        created_at: user.created_at,
      },
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
