import getApps from "./getApps";

const mockGet: (targetApp: string) => string = jest
  .fn()
  .mockImplementation((targetApp: string): string => {
    if (targetApp === "api-gateway") {
      return JSON.stringify({ "identity-server": "hash" });
    }
  });

jest.mock("../redis", () => ({
  get: (targetApp: string) => mockGet(targetApp),
}));

describe("Given the function getApps", () => {
  describe("When it receives the targetApp 'api-gateway' ", () => {
    test("Then it should return 'identity-server' and its hash", async () => {
      const expectedApps = { "identity-server": "hash" };

      const receivedApps = await getApps("api-gateway");

      expect(receivedApps).toStrictEqual(expectedApps);
    });
  });

  describe("When it receives the targetApp 'identity-server'", () => {
    test("Then it should return an empty object", async () => {
      const expectedApps = {};

      const receivedApps = await getApps("identity-server");

      expect(receivedApps).toStrictEqual(expectedApps);
    });
  });
});
