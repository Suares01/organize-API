import mongoose from "mongoose";

import { CustomValidation } from "@modules/users/models/User";
import logger from "@shared/logger/logger";

export class ErrorUtil {
  public static handleValidationError(error: mongoose.Error.ValidationError): {
    code: number;
    message: string;
  } {
    const duplicatedError = Object.values(error.errors).filter(
      (err) =>
        err.name === "ValidatorError" &&
        err.kind === CustomValidation.duplicated
    );

    const requiredError = Object.values(error.errors).filter(
      (err) =>
        err.name === "ValidatorError" && err.kind === CustomValidation.required
    );

    if (duplicatedError.length) return { code: 409, message: error.message };

    if (requiredError.length) return { code: 422, message: error.message };

    logger.error(error);
    return { code: 400, message: `unknowing validation error` };
  }
}
