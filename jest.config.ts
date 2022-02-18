import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: import("@jest/types").Config.InitialOptions = {
  displayName: "root-tests",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  testEnvironment: "node",
  bail: true,
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  preset: "ts-jest",
};

export default config;
