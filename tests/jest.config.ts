import rootConfig from "../jest.config";

const config: import("@jest/types").Config.InitialOptions = {
  ...rootConfig,
  displayName: "integration tests",
  setupFilesAfterEnv: ["<rootDir>/jestSetup.ts"],
  testMatch: ["<rootDir>/**/*.spec.ts"],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/../src/$1",
    "@modules/(.*)": "<rootDir>/../src/modules/$1",
    "@config/(.*)": "<rootDir>/../config/$1",
    "@tests/(.*)": "<rootDir>/$1",
  },
};

export default config;
