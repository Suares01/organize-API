import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { Project } from "@modules/projects/models/Project";
import { ProjectsRepository } from "@modules/projects/repositories/implementations/ProjectsRepository";
import { IUserDto } from "@modules/users/dtos/IUserDto";
import { User } from "@modules/users/models/User";
import { IApiErrorResponse } from "@src/shared/errors/IApiError";
import { generateJwt } from "@src/shared/util/token";

describe("User integration tests", () => {
  let token: string;

  const newProject: IProjectDto = {
    name: "new-api",
    path: "path/example",
  };

  const newProjectWithId: IProjectDto = {
    name: "new-api",
    path: "path/example",
    user_id: "",
  };

  beforeEach(async () => {
    await Project.deleteMany();
    await User.deleteMany();

    const defalutUser: IUserDto = {
      username: "Jhon Doe",
      password: "123",
    };

    const user = await new User(defalutUser).save();

    newProjectWithId.user_id = user.id;

    token = await generateJwt(
      {
        username: user.username,
        created_at: user.created_at,
      },
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
  });

  afterAll(async () => {
    await User.deleteMany();
    await Project.deleteMany();
  });

  describe("when creating a new project", () => {
    it("shoud successfully create a new project", async () => {
      const { body, status } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": token })
        .send(newProject);

      const project = await new ProjectsRepository().findOne(newProject);

      expect(status).toBe(201);
      expect(body).toEqual(JSON.parse(JSON.stringify(project)));
    });

    it("should return 409 when the name already exists", async () => {
      await global.testRequest
        .post("/projects")
        .set({ "x-access-token": token })
        .send(newProject);
      const { body, status } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": token })
        .send(newProject);

      expect(status).toBe(409);
      expect(body).toEqual<IApiErrorResponse>({
        code: 409,
        error: "Conflict",
        message: "Project already exists",
      });
    });

    it("should return 422 when the name is not defined", async () => {
      const { body, status } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": token })
        .send({
          path: newProject.path,
        });

      expect(status).toBe(422);
      expect(body).toEqual<IApiErrorResponse>({
        code: 422,
        error: "Unprocessable Entity",
        message: "Project validation failed: name: Path `name` is required.",
      });
    });
  });
});
