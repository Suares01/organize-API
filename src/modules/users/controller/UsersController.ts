import { Request, Response } from "express";
import { container } from "tsyringe";

import { Controller, Post } from "@overnightjs/core";

import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

@Controller("users")
export class UsersController {
  @Post("")
  async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const {
      id,
      username: name,
      created_at: createdAt,
    } = await container.resolve(CreateUserUseCase).execute(username, password);

    return res.status(201).send({ id, username: name, created_at: createdAt });
  }
}
