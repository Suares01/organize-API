import { Request, Response } from "express";
import { container } from "tsyringe";

import { authUserMiddleware } from "@middleware/auth/authUser";
import { IUserDto } from "@modules/users/dtos/IUserDto";
import { AuthenticateUserUseCase } from "@modules/users/useCases/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/users/useCases/CreateUserUseCase";
import { GetUserInfoUseCase } from "@modules/users/useCases/GetUserInfoUseCase";
import { Controller, Get, Middleware, Post } from "@overnightjs/core";

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

  @Post("authenticate")
  async authenticate(req: Request, res: Response): Promise<Response> {
    const { password, username } = req.body as IUserDto;

    const token = await container
      .resolve(AuthenticateUserUseCase)
      .execute({ username, password });

    return res.status(200).send({
      token,
    });
  }

  @Get("me")
  @Middleware(authUserMiddleware)
  async getInfo(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const {
      id: userID,
      username,
      created_at: createdAt,
    } = await container.resolve(GetUserInfoUseCase).execute(id);

    return res.send({
      id: userID,
      username,
      created_at: createdAt,
    });
  }
}
