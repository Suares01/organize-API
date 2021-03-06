import { inject, injectable } from "tsyringe";

import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject } from "@modules/projects/models/Project";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";
import { ConflictError } from "@shared/errors/internalErrors/ConflictError";

@injectable()
export class CreateProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  async execute(data: IProjectDto): Promise<IProject> {
    const projectAlreadyExists = await this.projectsRepository.findOne({
      name: data.name,
      user_id: `${data.user_id}`,
    });

    if (projectAlreadyExists) throw new ConflictError("Project already exists");

    const project = await this.projectsRepository.insert(data);

    return project;
  }
}
