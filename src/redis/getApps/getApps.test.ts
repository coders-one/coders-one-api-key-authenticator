import getApps from "./getApps.js";
import appNames from "../../utils/appNames.js";
import { hashedKey } from "../../setupTests.js";

const { apiGateway, identityServer } = appNames;

describe("Given the function getApps", () => {
  describe("When it receives the targetApp 'api-gateway' ", () => {
    test("Then it should return 'identity-server' and its hash", async () => {
      const expectedApps = { [identityServer]: hashedKey };

      const receivedApps = await getApps(apiGateway);

      expect(receivedApps).toStrictEqual(expectedApps);
    });
  });

  describe("When it receives the targetApp 'identity-server'", () => {
    test("Then it should return an empty object", async () => {
      const expectedApps = {};

      const receivedApps = await getApps(identityServer);

      expect(receivedApps).toStrictEqual(expectedApps);
    });
  });
});
