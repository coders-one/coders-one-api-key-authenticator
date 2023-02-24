import appNames from "./utils/appNames.js";
import bcrypt from "bcryptjs";

export const hashedKey = bcrypt.hashSync("key", 10);

const { apiGateway, identityServer } = appNames;

const mockHashGet: (
  targetApp: string,
  appToAuthenticate: string
) => string | undefined = jest
  .fn()
  .mockImplementation(
    (targetApp: string, appToAuthenticate: string): string | undefined => {
      if (targetApp === apiGateway && appToAuthenticate === identityServer) {
        return hashedKey;
      }

      return null;
    }
  );

jest.mock("./redis/redis.js", () => ({
  hget: (targetApp: string, appToAuthenticate: string) =>
    mockHashGet(targetApp, appToAuthenticate),
}));
