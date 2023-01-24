import appNames from "../utils/appNames.js";
import authenticateApp from "./authenticateApp.js";

const { apiGateway, identityServer } = appNames;

describe("Given the function authenticateApp", () => {
  const testHash = "hash";

  describe("When it receives targetApp 'api-gateway', appToAuthenticate 'identity-server' and hashToAuthenticate 'hash'", () => {
    test("Then it should return true", async () => {
      const isAuthenticatedResult = true;

      const isAuthenticated = await authenticateApp(
        apiGateway,
        identityServer,
        testHash
      );

      expect(isAuthenticated).toBe(isAuthenticatedResult);
    });
  });

  describe("When it receives targetApp 'identity-server', appToAuthenticate 'api-gateway' and hashToAuthenticate 'hash'", () => {
    test("Then it should return false", async () => {
      const isAuthenticatedResult = false;

      const isAuthenticated = await authenticateApp(
        identityServer,
        apiGateway,
        testHash
      );

      expect(isAuthenticated).toBe(isAuthenticatedResult);
    });
  });
});
