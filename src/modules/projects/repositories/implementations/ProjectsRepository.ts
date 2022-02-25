import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { IProject, Project } from "@modules/projects/models/Project";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";

export class ProjectsRepository implements IProjectsRepository {
  async insert(data: IProjectDto): Promise<IProject> {
    const newProject = new Project(data);

    const project = await newProject.save();

    return project;
  }

  async findOne(data: IProjectDto): Promise<IProject | null> {
    const project = await Project.findOne({
      name: data.name,
      user_id: data.user_id,
    });

    return project;
  }
}
