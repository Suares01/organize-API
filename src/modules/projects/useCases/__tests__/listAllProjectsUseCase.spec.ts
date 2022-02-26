import "reflect-metadata";

import { IProject } from "@modules/projects/models/Project";
import { ProjectsRepository } from "@modules/projects/repositories/implementations/ProjectsRepository";

import { ListAllProjectsUseCase } from "../ListAllProjectsUseCase";

jest.mock("@modules/projects/repositories/implementations/ProjectsRepository");

describe("List all user projects use case", () => {
  const mockedProjectsRepository =
    new ProjectsRepository() as jest.Mocked<ProjectsRepository>;

  const listOfProjects: IProject[] = [
    {
      id: "ds4gsd1g5s6d1",
      name: "project-1",
      path: "project-1/path",
      user_id: "1vd5sf5ds1ds81f",
      created_at: new Date(),
    },
    {
      id: "1b59fdg56df0f",
      name: "project-2",
      path: "project-2/path",
      user_id: "1vd5sf5ds1ds81f",
      created_at: new Date(),
    },
  ];

  it("should return a list of projects", async () => {
    mockedProjectsRepository.findAll.mockResolvedValue(listOfProjects);

    const listAllProjectsUseCase = new ListAllProjectsUseCase(
      mockedProjectsRepository
    );

    const projects = await listAllProjectsUseCase.execute("1vd5sf5ds1ds81f");

    expect(projects).toEqual(listOfProjects);
    projects.forEach((project) => {
      expect(project.user_id).toBe("1vd5sf5ds1ds81f");
    });
  });

  it("should return a empty list if the user don't have any project", async () => {
    mockedProjectsRepository.findAll.mockResolvedValue([]);

    const listAllProjectsUseCase = new ListAllProjectsUseCase(
      mockedProjectsRepository
    );

    const projects = await listAllProjectsUseCase.execute("1vd5sf5ds1ds81f");

    expect(projects).toEqual([]);
  });
});
