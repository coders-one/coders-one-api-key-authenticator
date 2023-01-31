import type { Request, NextFunction } from "express";
import checkApiKey from "./checkApiKey";
import appNames from "../utils/appNames";

const { apiGateway, identityServer } = appNames;

const headers: Record<string, string> = {
  "X-API-KEY": "hash",
};
const req: Partial<Request> = {
  headers,

  get: jest.fn().mockImplementation((name: string) => headers[name]),
};

const next: NextFunction = jest.fn();

describe("Given the middleware returned from checkApiKey invoked with targetApp 'api-gateway' and appToAuthenticate 'identity-server'", () => {
  const checkApiKeyMiddleware = checkApiKey(apiGateway, identityServer);

  describe("When it receives a request with header X-API-KEY 'hash'", () => {
    test("Then it should invoke next with no parameters", async () => {
      await checkApiKeyMiddleware(req as Request, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
