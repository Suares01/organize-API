import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject } from "@modules/projects/models/Project";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";

export class CreateProjectUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(data: IProjectDto): Promise<IProject> {
    const project = await this.projectsRepository.insert(data);

    return project;
  }
}
