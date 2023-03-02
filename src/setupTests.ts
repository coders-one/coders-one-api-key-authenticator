import mockHashGet from "./mocks/mockHashGet";

jest.mock("./redis/redis.js", () => ({
  hget: (targetApp: string, appToAuthenticate: string) =>
    mockHashGet(targetApp, appToAuthenticate),
}));
