import { Request, Response } from "express";
import { container } from "tsyringe";

import { authUserMiddleware } from "@middleware/auth/authUser";
import { IProjectDto } from "@modules/projects/dtos/IProjectDto";
import { CreateProjectUseCase } from "@modules/projects/useCases/CreateProjectUseCase";
import { FindProjectUseCase } from "@modules/projects/useCases/FindProjectUseCase";
import { ListAllProjectsUseCase } from "@modules/projects/useCases/ListAllProjectsUseCase";
import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";

@Controller("projects")
@ClassMiddleware(authUserMiddleware)
export class ProjectsController {
  @Post("")
  async create(req: Request, res: Response): Promise<Response> {
    const { name, path } = req.body as IProjectDto;
    const { id } = req.user;

    const project = await container
      .resolve(CreateProjectUseCase)
      .execute({ name, path, user_id: id });

    return res.status(201).send(project);
  }

  @Get("")
  async list(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listOfProjects = await container
      .resolve(ListAllProjectsUseCase)
      .execute(id);

    return res.send(listOfProjects);
  }

  @Get(":name")
  async find(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const { id } = req.user;

    const project = await container
      .resolve(FindProjectUseCase)
      .execute({ name, user_id: id });

    return res.send(project);
  }
}
