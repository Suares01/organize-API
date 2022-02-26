import "reflect-metadata";

import { IProject } from "@modules/projects/models/Project";
import { ProjectsRepository } from "@modules/projects/repositories/implementations/ProjectsRepository";
import { NotFoundError } from "@shared/errors/internalErrors/NotFoundError";

import { FindProjectUseCase } from "../FindProjectUseCase";

jest.mock("@modules/projects/repositories/implementations/ProjectsRepository");

describe("Find Project Use Case", () => {
  const mockedProjectsRepository =
    new ProjectsRepository() as jest.Mocked<ProjectsRepository>;

  const defaultProject: IProject = {
    id: "51ds5f91ds5f1",
    name: "API",
    path: "api/path",
    user_id: "151fsdfdsf1ds1fs",
    created_at: new Date(),
  };

  it("should return a specific project using the name given by the user", async () => {
    mockedProjectsRepository.findOne.mockResolvedValue(defaultProject);

    const findProjectUseCase = new FindProjectUseCase(mockedProjectsRepository);

    const project = await findProjectUseCase.execute({
      name: defaultProject.name,
      user_id: `${defaultProject.user_id}`,
    });

    expect(project).toEqual(defaultProject);
  });

  it("should throw NotFoundError if the project does not exists", async () => {
    mockedProjectsRepository.findOne.mockResolvedValue(null);

    const findProjectUseCase = new FindProjectUseCase(mockedProjectsRepository);

    const project = findProjectUseCase.execute({
      name: defaultProject.name,
      user_id: `${defaultProject.user_id}`,
    });

    await expect(project).rejects.toBeInstanceOf(NotFoundError);
    await expect(project).rejects.toThrow(
      new NotFoundError(`Project "${defaultProject.name}" does not exists`)
    );
  });
});
