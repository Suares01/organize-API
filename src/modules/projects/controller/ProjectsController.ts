import { Request, Response } from "express";
import { container } from "tsyringe";

import { ClassMiddleware, Controller, Post } from "@overnightjs/core";
import { authUserMiddleware } from "@src/middleware/auth/authUser";

import { IProjectDto } from "../dtos/IProjectDto";
import { CreateProjectUseCase } from "../useCases/CreateProjectUseCase";

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
}
