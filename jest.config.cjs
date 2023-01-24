/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/redis/redis.ts",
    "!src/setupTests.ts",
  ],
  resolver: "jest-ts-webcompat-resolver",
  setupFiles: ["./src/setupTests.ts"],
};
