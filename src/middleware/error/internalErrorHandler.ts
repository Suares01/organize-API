import { NextFunction, Request, Response } from "express";

import { ApiError } from "@src/shared/errors/ApiError";
import { InternalError } from "@src/shared/errors/internalErrors/InternalError";

export function internalErrorHandler(
  error: unknown,
  _: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (error instanceof InternalError) {
    const { code, message, description, documentation } = error;

    return res.status(code).send(
      ApiError.format({
        code,
        message,
        ...(description && { description }),
        ...(documentation && { documentation }),
      })
    );
  }

  return next(error);
}
