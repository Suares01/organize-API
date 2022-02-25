import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { Project } from "@modules/projects/models/Project";
import { ProjectsRepository } from "@modules/projects/repositories/implementations/ProjectsRepository";
import { IUserDto } from "@modules/users/dtos/IUserDto";
import { User } from "@modules/users/models/User";
import { IApiErrorResponse } from "@shared/errors/IApiError";
import { generateJwt } from "@shared/util/token";

describe("User integration tests", () => {
  let token: string;

  const defalutProject: IProjectDto = {
    name: "new-api",
    path: "path/example",
  };

  const defalutUser: IUserDto = {
    username: "Jhon Doe",
    password: "123",
  };

  beforeEach(async () => {
    await Project.deleteMany();
    await User.deleteMany();

    const user = await new User(defalutUser).save();

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
      const newUser: IUserDto = {
        username: "Jhon Doe 2",
        password: "123",
      };

      const user = await new User(newUser).save();

      const newUserToken = await generateJwt(
        {
          username: user.username,
          created_at: user.created_at,
        },
        {
          subject: user.id,
          expiresIn: "1d",
        }
      );

      const { body, status } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": newUserToken })
        .send(defalutProject);

      const project = await new ProjectsRepository().findOne({
        name: defalutProject.name,
        user_id: user.id,
      });

      expect(status).toBe(201);
      expect(body).toEqual(JSON.parse(JSON.stringify(project)));
    });

    it("should return 409 when the name already exists", async () => {
      await global.testRequest
        .post("/projects")
        .set({ "x-access-token": token })
        .send(defalutProject);
      const { body, status } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": token })
        .send(defalutProject);

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
          path: defalutProject.path,
        });

      expect(status).toBe(422);
      expect(body).toEqual<IApiErrorResponse>({
        code: 422,
        error: "Unprocessable Entity",
        message: "Project validation failed: name: Path `name` is required.",
      });
    });

    it("different users can create a project with the same name", async () => {
      const paul = await new User({
        username: "Paul",
        password: "123",
      }).save();

      const jack = await new User({
        username: "Jack",
        password: "123",
      }).save();

      const paulToken = await generateJwt(
        { username: paul.username },
        { subject: paul.id }
      );

      const jackToken = await generateJwt(
        { username: jack.username },
        { subject: jack.id }
      );

      const { body: paulBody, status: paulStatus } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": paulToken })
        .send(defalutProject);

      const { body: jackBody, status: jackStatus } = await global.testRequest
        .post("/projects")
        .set({ "x-access-token": jackToken })
        .send(defalutProject);

      expect(paulStatus && jackStatus).toBe(201);
      expect(paulBody && jackBody).toEqual(
        expect.objectContaining(defalutProject)
      );
    });
  });
});
