import { IProjectDto } from "../dtos/IProjectDto";
import { IProject } from "../models/Project";
import { IProjectsRepository } from "../repositories/IProjectsRepository";

export class CreateProjectUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(data: IProjectDto): Promise<IProject> {
    const project = await this.projectsRepository.insert(data);

    return project;
  }
}
