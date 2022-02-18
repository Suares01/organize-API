import httpStatusCodes from "http-status-codes";

export interface IApiError {
  code: number;
  message: string;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface IApiErrorResponse extends Omit<IApiError, "codeAsString"> {
  error: string;
}

export default httpStatusCodes;
