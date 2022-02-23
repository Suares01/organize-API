import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject } from "@modules/projects/models/Project";

export interface IProjectsRepository {
  insert(data: IProjectDto): Promise<IProject>;
  findOne(data: IProjectDto): Promise<IProject | null>;
}
