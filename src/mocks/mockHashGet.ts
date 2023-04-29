import appNames from "../utils/appNames.js";
import hashedKey from "./hashedKey.js";

const { apiGateway, identityServer } = appNames;

const mockHashGet: (
  targetApp: string,
  appToAuthenticate: string
) => string | null = jest
  .fn()
  .mockImplementation(
    (targetApp: string, appToAuthenticate: string): string | null => {
      if (targetApp === apiGateway && appToAuthenticate === identityServer) {
        return hashedKey;
      }

      return null;
    }
  );

export default mockHashGet;
