import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "@shared/errors/ApiError";
import { ErrorUtil } from "@shared/errors/ErrorUtil";

export function mongooseErrorHandler(
  error: unknown,
  _: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const { handleValidationError } = ErrorUtil;

  if (error instanceof mongoose.Error.ValidationError) {
    const { code, message } = handleValidationError(error);

    return res.status(code).send(
      ApiError.format({
        code,
        message,
      })
    );
  }

  return next(error);
}
