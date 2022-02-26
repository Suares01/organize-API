import { inject, injectable } from "tsyringe";

import { IProject } from "@modules/projects/models/Project";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";

@injectable()
export class ListAllProjectsUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  async execute(userId: string): Promise<IProject[]> {
    const projects = await this.projectsRepository.findAll(userId);

    return projects;
  }
}
