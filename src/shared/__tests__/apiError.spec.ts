import { ApiError } from "../errors/ApiError";
import { IApiErrorResponse } from "../errors/IApiError";

describe("ApiError tests", () => {
  it("should format erros with mandatory fields", () => {
    const format = ApiError.format({
      message: "User not found",
      code: 404,
    });

    expect(format).toEqual<IApiErrorResponse>({
      message: "User not found",
      code: 404,
      error: "Not Found",
    });
  });

  it("should format erros with mandatory fields and description", () => {
    const format = ApiError.format({
      message: "User not found",
      code: 404,
      description: "User not foud in the database",
    });

    expect(format).toEqual<IApiErrorResponse>({
      message: "User not found",
      code: 404,
      error: "Not Found",
      description: "User not foud in the database",
    });
  });

  it("should format erros with mandatory fields and documentation", () => {
    const format = ApiError.format({
      message: "User not found",
      code: 404,
      documentation: "docs url",
    });

    expect(format).toEqual<IApiErrorResponse>({
      message: "User not found",
      code: 404,
      error: "Not Found",
      documentation: "docs url",
    });
  });

  it("should format erros with mandatory fields, documentation and description", () => {
    const format = ApiError.format({
      message: "User not found",
      code: 404,
      documentation: "docs url",
      description: "User not foud in the database",
    });

    expect(format).toEqual<IApiErrorResponse>({
      message: "User not found",
      code: 404,
      error: "Not Found",
      documentation: "docs url",
      description: "User not foud in the database",
    });
  });
});
