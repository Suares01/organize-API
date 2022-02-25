import { NextFunction, Request, Response } from "express";

import { ApiError } from "@shared/errors/ApiError";
import logger from "@shared/logger/logger";

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
