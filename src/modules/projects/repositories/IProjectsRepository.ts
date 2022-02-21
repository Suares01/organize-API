import { IProjectDto } from "../dtos/IProjectDto";
import { IProject } from "../models/Project";

export interface IProjectsRepository {
  insert(data: IProjectDto): Promise<IProject>;
  findOne(name: string): Promise<IProject | null>;
}
