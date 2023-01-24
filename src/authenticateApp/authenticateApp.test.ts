import appNames from "../utils/appNames.js";
import authenticateApp from "./authenticateApp.js";

const { apiGateway, identityServer } = appNames;

describe("Given the function authenticateApp", () => {
  describe("When it receives targetApp 'api-gateway', appToAuthenticate 'identity-server' and hashToAuthenticate 'test-hash'", () => {
    test("Then it should return true", async () => {
      const isAuthenticated = await authenticateApp(
        apiGateway,
        identityServer,
        "hash"
      );

      expect(isAuthenticated).toBe(true);
    });
  });
});
