import { IProjectDto } from "../../dtos/IProjectDto";
import { IProject, Project } from "../../models/Project";
import { IProjectsRepository } from "../IProjectsRepository";

export class ProjectsRepository implements IProjectsRepository {
  async insert(data: IProjectDto): Promise<IProject> {
    const newProject = new Project(data);

    const project = await newProject.save();

    return project;
  }

  async findOne(name: string): Promise<IProject | null> {
    const project = await Project.findOne({ name });

    return project;
  }
}
