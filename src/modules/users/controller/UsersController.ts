import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/users/useCases/CreateUserUseCase";
import { Controller, Post } from "@overnightjs/core";

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

    return res.status(201).send(
      JSON.parse(
        JSON.stringify({
          id,
          username: name,
          created_at: createdAt,
        })
      )
    );
  }
}
