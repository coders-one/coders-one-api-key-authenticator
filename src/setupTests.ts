import appNames from "./utils/appNames.js";
import bcrypt from "bcryptjs";

export const hashedKey = bcrypt.hashSync("key", 10);

const { apiGateway, identityServer } = appNames;

const mockGet: (targetApp: string) => string = jest
  .fn()
  .mockImplementation((targetApp: string): string => {
    if (targetApp === apiGateway) {
      return JSON.stringify({ [identityServer]: hashedKey });
    }

    return "";
  });

jest.mock("./redis/redis.js", () => ({
  get: (targetApp: string) => mockGet(targetApp),
}));
