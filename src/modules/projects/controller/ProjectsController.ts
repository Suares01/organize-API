import { Request, Response } from "express";
import { container } from "tsyringe";

import { Controller, Post } from "@overnightjs/core";

import { IProjectDto } from "../dtos/IProjectDto";
import { CreateProjectUseCase } from "../useCases/CreateProjectUseCase";

@Controller("projects")
export class ProjectsController {
  @Post("")
  async create(req: Request, res: Response): Promise<Response> {
    const { name, path } = req.body as IProjectDto;

    const project = await container
      .resolve(CreateProjectUseCase)
      .execute({ name, path });

    return res.status(201).send(project);
  }
}
