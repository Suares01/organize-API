import rootConfig from "../jest.config";

const config: import("@jest/types").Config.InitialOptions = {
  ...rootConfig,
  displayName: "integration tests",
  setupFilesAfterEnv: ["<rootDir>/jestSetup.ts"],
  testMatch: ["<rootDir>/**/*.spec.ts"],
  moduleNameMapper: {
    "@middleware/(.*)": "<rootDir>/../src/middleware/$1",
    "@modules/(.*)": "<rootDir>/../src/modules/$1",
    "@config/(.*)": "<rootDir>/../config/$1",
    "@tests/(.*)": "<rootDir>/$1",
    "@shared/(.*)": "<rootDir>/../src/shared/$1",
  },
};

export default config;
