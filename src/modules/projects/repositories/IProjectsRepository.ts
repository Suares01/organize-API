import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject } from "@modules/projects/models/Project";

export interface IFindOne {
  name: string;
  user_id: string;
}

export interface IProjectsRepository {
  insert(data: IProjectDto): Promise<IProject>;
  findOne(data: IFindOne): Promise<IProject | null>;
  findAll(userId: string): Promise<IProject[]>;
}
