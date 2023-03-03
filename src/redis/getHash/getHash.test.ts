import hashedKey from "../../mocks/hashedKey.js";
import appNames from "../../utils/appNames.js";
import getHash from "./getHash.js";

const { apiGateway, identityServer } = appNames;

describe("Given the function getHash", () => {
  describe("When it receives the targetApp 'api-gateway' and appToAuthenticate 'identity-server'", () => {
    test("Then it should return identity server's hash", async () => {
      const expectedHash = hashedKey;

      const receivedApps = await getHash(apiGateway, identityServer);

      expect(receivedApps).toBe(expectedHash);
    });
  });

  describe("When it receives the targetApp 'identity-server' and appToAuthenticate 'api-gateway'", () => {
    test("Then it should return null", async () => {
      const receivedApps = await getHash(identityServer, apiGateway);

      expect(receivedApps).toBeNull();
    });
  });
});
