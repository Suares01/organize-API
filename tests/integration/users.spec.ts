import { IUser, User } from "@modules/users/models/User";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { IApiErrorResponse } from "@shared/errors/IApiError";

describe("User integration tests", () => {
  beforeEach(async () => await User.deleteMany());

  afterAll(async () => await User.deleteMany());

  const newUser = {
    username: "John Doe",
    password: "123456",
  };

  describe("when creating a new user", () => {
    it("shoud successfully create a new user", async () => {
      const { body, status } = await global.testRequest
        .post("/users")
        .send(newUser);

      const {
        id,
        username,
        created_at: createdAt,
      } = (await new UsersRepository().findOne({
        username: newUser.username,
      })) as IUser;

      expect(status).toBe(201);
      expect(body).toEqual(
        JSON.parse(
          JSON.stringify({
            id,
            username,
            created_at: createdAt,
          })
        )
      );
    });

    it("should return 409 when the username already exists", async () => {
      await global.testRequest.post("/users").send(newUser);
      const { body, status } = await global.testRequest
        .post("/users")
        .send(newUser);

      expect(status).toBe(409);
      expect(body).toEqual<IApiErrorResponse>({
        code: 409,
        error: "Conflict",
        message: "User validation failed: username: already exists",
      });
    });

    it("should return 422 when the username is not defined", async () => {
      const { body, status } = await global.testRequest.post("/users").send({
        password: newUser.password,
      });

      expect(status).toBe(422);
      expect(body).toEqual<IApiErrorResponse>({
        code: 422,
        error: "Unprocessable Entity",
        message:
          "User validation failed: username: Path `username` is required.",
      });
    });
  });

  describe("when authenticate a user", () => {
    it("should generate a token for a valid user", async () => {
      await new User(newUser).save();

      const { body, status } = await global.testRequest
        .post("/users/authenticate")
        .send({
          username: newUser.username,
          password: newUser.password,
        });

      expect(status).toBe(200);
      expect(body).toEqual({
        token: expect.any(String),
      });
    });

    it("should return unauthorized if the username isn't found", async () => {
      await new User(newUser).save();

      const { body, status } = await global.testRequest
        .post("/users/authenticate")
        .send({
          username: "invalid_user_name",
          password: newUser.password,
        });

      expect(status).toBe(401);
      expect(body).toEqual<IApiErrorResponse>({
        code: 401,
        error: "Unauthorized",
        message: "username or password incorrect",
      });
    });

    it("should return unauthorized if the password given by the user is incorrect", async () => {
      await new User(newUser).save();

      const { body, status } = await global.testRequest
        .post("/users/authenticate")
        .send({
          username: newUser.username,
          password: "incorrect_pass",
        });

      expect(status).toBe(401);
      expect(body).toEqual<IApiErrorResponse>({
        code: 401,
        error: "Unauthorized",
        message: "username or password incorrect",
      });
    });
  });
});
