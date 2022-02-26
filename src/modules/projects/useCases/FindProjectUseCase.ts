import { inject, injectable } from "tsyringe";

import { IProject } from "@modules/projects/models/Project";
import {
  IFindOne,
  IProjectsRepository,
} from "@modules/projects/repositories/IProjectsRepository";
import { NotFoundError } from "@shared/errors/internalErrors/NotFoundError";

@injectable()
export class FindProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  async execute({ name, user_id: userId }: IFindOne): Promise<IProject> {
    const project = await this.projectsRepository.findOne({
      name,
      user_id: userId,
    });

    if (!project) throw new NotFoundError(`Project "${name}" does not exists`);

    return project;
  }
}
