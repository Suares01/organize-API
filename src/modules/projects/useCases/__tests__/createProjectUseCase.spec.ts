import "reflect-metadata";

import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject } from "@modules/projects/models/Project";
import { ProjectsRepository } from "@modules/projects/repositories/implementations/ProjectsRepository";
import { CreateProjectUseCase } from "@modules/projects/useCases/CreateProjectUseCase";
import { ConflictError } from "@src/shared/errors/internalErrors/ConflictError";

jest.mock("@modules/projects/repositories/implementations/ProjectsRepository");

describe("Create Project Use Case tests", () => {
  const mockedProjectsRepository =
    new ProjectsRepository() as jest.Mocked<ProjectsRepository>;

  const newProject: IProjectDto = {
    name: "new-api",
    path: "path/example",
    user_id: "1fd5s61fsdf0",
  };

  const createdProjet: IProject = {
    id: "1fd5s61fsdf0",
    ...newProject,
    user_id: "f56sg5ds1551",
    created_at: new Date(),
  };

  it("should return a new project", async () => {
    mockedProjectsRepository.insert.mockResolvedValue(createdProjet);

    const createProjectUseCase = new CreateProjectUseCase(
      mockedProjectsRepository
    );

    const project = await createProjectUseCase.execute(newProject);

    expect(project).toEqual(createdProjet);
  });

  it("should throw ConflictError if the user already has a project with the given name", async () => {
    mockedProjectsRepository.findOne.mockResolvedValue(createdProjet);

    const createProjectUseCase = new CreateProjectUseCase(
      mockedProjectsRepository
    );

    await expect(
      createProjectUseCase.execute(newProject)
    ).rejects.toBeInstanceOf(ConflictError);
    await expect(createProjectUseCase.execute(newProject)).rejects.toThrow(
      new ConflictError("Project already exists")
    );
  });
});
