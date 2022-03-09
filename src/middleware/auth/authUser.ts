import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { NotFoundError } from "@shared/errors/internalErrors/NotFoundError";
import { UnauthorizedError } from "@shared/errors/internalErrors/UnauthorizedError";
import { verifyJwt } from "@shared/util/token";

interface IPayLoad {
  sub: string;
}

export async function authUserMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers?.["x-access-token"];

  if (!token || typeof token !== "string")
    throw new UnauthorizedError("jwt must be provided");

  let id: string;

  try {
    const { sub: userId } = (await verifyJwt(token)) as IPayLoad;

    id = userId;
  } catch (error: any) {
    throw new UnauthorizedError(error.message);
  }
  const usersRepository = container.resolve(UsersRepository);

  const user = await usersRepository.findOne({ id });

  if (!user) throw new NotFoundError("User not found");

  req.user = {
    id,
  };

  next();
}
