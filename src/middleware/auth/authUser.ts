import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
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

  try {
    const { sub: userId } = (await verifyJwt(token)) as IPayLoad;

    const usersRepository = container.resolve(UsersRepository);

    const user = await usersRepository.findOne({ id: userId });

    if (!user) throw new UnauthorizedError("User not found");

    req.user = {
      id: userId,
    };

    next();
  } catch (error: any) {
    throw new UnauthorizedError(error.message);
  }
}
