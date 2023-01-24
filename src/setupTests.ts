import appNames from "./utils/appNames.js";

const { apiGateway, identityServer } = appNames;

const mockGet: (targetApp: string) => string = jest
  .fn()
  .mockImplementation((targetApp: string): string => {
    if (targetApp === apiGateway) {
      return JSON.stringify({ [identityServer]: "hash" });
    }
  });

jest.mock("./redis/redis.js", () => ({
  get: (targetApp: string) => mockGet(targetApp),
}));
