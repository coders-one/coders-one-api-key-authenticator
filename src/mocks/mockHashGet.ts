import appNames from "../utils/appNames.js";
import hashedKey from "./hashedKey.js";

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

export default mockHashGet;
