import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject, Project } from "@modules/projects/models/Project";
import {
  IFindOne,
  IProjectsRepository,
} from "@modules/projects/repositories/IProjectsRepository";

export class ProjectsRepository implements IProjectsRepository {
  public async insert(data: IProjectDto): Promise<IProject> {
    const newProject = new Project(data);

    const project = await newProject.save();

    return project;
  }

  public async findOne(data: IFindOne): Promise<IProject | null> {
    const project = await Project.findOne({
      name: data.name,
      user_id: data.user_id,
    });

    return project;
  }

  public async findAll(userId: string): Promise<IProject[]> {
    const projects = await Project.find({
      user_id: userId,
    });

    return projects;
  }
}
