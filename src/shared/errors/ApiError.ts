import httpStatusCodes, { IApiError, IApiErrorResponse } from "./IApiError";

export class ApiError {
  public static format({
    message,
    code,
    codeAsString,
    description,
    documentation,
  }: IApiError): IApiErrorResponse {
    return {
      ...{
        message,
        code,
        error: codeAsString || httpStatusCodes.getStatusText(code),
      },
      ...(description && { description }),
      ...(documentation && { documentation }),
    };
  }
}
