import { ProjectsRepository } from "@src/modules/projects/repositories/implementations/ProjectsRepository";

import { IProjectDto } from "../../dtos/IProjectDto";
import { IProject } from "../../models/Project";
import { CreateProjectUseCase } from "../CreateProjectUseCase";

jest.mock(
  "@src/modules/projects/repositories/implementations/ProjectsRepository"
);

describe("Create Project Use Case tests", () => {
  const mockedProjectsRepository =
    new ProjectsRepository() as jest.Mocked<ProjectsRepository>;

  const newProject: IProjectDto = {
    name: "new-api",
    path: "path/example",
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
});
