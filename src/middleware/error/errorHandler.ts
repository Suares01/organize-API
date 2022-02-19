import { NextFunction, Request, Response } from "express";

import logger from "@src/logger/logger";
import { ApiError } from "@src/shared/errors/ApiError";

export function errorHandler(
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
): Response {
  logger.error(error);
  return res.status(500).send(
    ApiError.format({
      message: "Something went wrong",
      code: 500,
    })
  );
}
