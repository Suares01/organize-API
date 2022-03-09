import "reflect-metadata";
import { IUser } from "@modules/users/models/User";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { GetUserInfoUseCase } from "@modules/users/useCases/GetUserInfoUseCase";

jest.mock("@modules/users/repositories/implementations/UsersRepository");

describe("Get user info use case tests", () => {
  const mockedUsersRepository =
    new UsersRepository() as jest.Mocked<UsersRepository>;

  const defaultUser: IUser = {
    id: "56SG198D1G5",
    username: "jhon Doe",
    password: "123",
    created_at: new Date(),
  };

  it("should return a user if it exists in the database", async () => {
    mockedUsersRepository.findOne.mockResolvedValue(defaultUser);

    const getUserInfoUseCase = new GetUserInfoUseCase(mockedUsersRepository);

    const user = await getUserInfoUseCase.execute(defaultUser.id as string);

    expect(user).toEqual(defaultUser);
  });
});
