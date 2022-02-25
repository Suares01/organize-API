import "reflect-metadata";

import bcrypt from "bcrypt";

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { UnauthorizedError } from "@shared/errors/internalErrors/UnauthorizedError";

import { IUser } from "../../models/User";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

jest.mock("@modules/users/repositories/implementations/UsersRepository");
jest.mock("bcrypt");

describe("Authenticate User Use Case tests", () => {
  const mockedUsersRepository =
    new UsersRepository() as jest.Mocked<UsersRepository>;

  const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

  const newUser = {
    username: "Jhon Doe",
    password: "123456",
  };

  const createdUser: IUser = {
    id: "fd5f98ds1g26d",
    ...newUser,
    created_at: new Date(),
  };

  it("should return a token for a valid user", async () => {
    mockedUsersRepository.findOne.mockResolvedValue(createdUser);
    mockedBcrypt.compare.mockResolvedValue(true as never);

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      mockedUsersRepository
    );

    const token = await authenticateUserUseCase.execute({
      username: newUser.username,
      password: newUser.password,
    });

    expect(token).toEqual(expect.any(String));
  });

  it("should throw an UnauthorizedError if the username isn't found", async () => {
    mockedUsersRepository.findOne.mockResolvedValue(null);

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      mockedUsersRepository
    );

    await expect(
      authenticateUserUseCase.execute({
        username: newUser.username,
        password: newUser.password,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);

    expect(
      authenticateUserUseCase.execute({
        username: newUser.username,
        password: newUser.password,
      })
    ).rejects.toThrow(new UnauthorizedError("username or password incorrect"));
  });

  it("should throw an UnauthorizedError if the password is incorrect", async () => {
    mockedUsersRepository.findOne.mockResolvedValue(createdUser);
    mockedBcrypt.compare.mockResolvedValue(false as never);

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      mockedUsersRepository
    );

    await expect(
      authenticateUserUseCase.execute({
        username: newUser.username,
        password: newUser.password,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);

    await expect(
      authenticateUserUseCase.execute({
        username: newUser.username,
        password: newUser.password,
      })
    ).rejects.toThrow(new UnauthorizedError("username or password incorrect"));
  });
});
