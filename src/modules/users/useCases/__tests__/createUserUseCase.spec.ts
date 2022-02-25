import "reflect-metadata";

import { IUser } from "@modules/users/models/User";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUserUseCase";

jest.mock("@modules/users/repositories/implementations/UsersRepository");

describe("Create user use cases tests", () => {
  const mockedUsersRepository =
    new UsersRepository() as jest.Mocked<UsersRepository>;

  const newUser = {
    username: "Jhon Doe",
    password: "123456",
  };

  const createdUser: IUser = {
    id: "fd5f98ds1g26d",
    ...newUser,
    created_at: new Date(),
  };

  it("should return a new user", async () => {
    mockedUsersRepository.insert.mockResolvedValue(createdUser);

    const createUserUseCase = new CreateUserUseCase(mockedUsersRepository);

    const user = await createUserUseCase.execute(
      newUser.username,
      newUser.password
    );

    expect(user).toEqual(createdUser);
  });
});
