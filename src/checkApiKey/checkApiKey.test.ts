import type { Request, NextFunction } from "express";
import checkApiKey from "./checkApiKey";
import appNames from "../utils/appNames";
import type { CustomError } from "../types";

const { apiGateway, identityServer } = appNames;

const headers: Record<string, string> = {
  "X-API-KEY": "hash",
};

const req: Partial<Request> = {
  headers,

  get: jest.fn().mockImplementation((name: string) => headers[name]),
};

const next: NextFunction = jest.fn();

afterEach(() => jest.clearAllMocks());

describe("Given the middleware returned from checkApiKey invoked with targetApp 'api-gateway' and appToAuthenticate 'identity-server'", () => {
  describe("When it receives a request with header X-API-KEY 'hash'", () => {
    test("Then it should invoke next with no parameters", async () => {
      const checkApiKeyMiddleware = checkApiKey(apiGateway, identityServer);

      await checkApiKeyMiddleware(req as Request, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the middleware returned from checkApiKey invoked with targetApp 'identity-server' and appToAuthenticate 'api-gateway'", () => {
  describe("When it receives a request with header X-API-KEY 'hash'", () => {
    test("Then it should invoke next with an error with message 'Invalid API key' and statusCode 401", async () => {
      const checkApiKeyMiddleware = checkApiKey(identityServer, apiGateway);
      const invalidKeyMessage = "Invalid API key";
      const invalidKeyError = new Error(invalidKeyMessage);
      (invalidKeyError as CustomError).statusCode = 401;

      await checkApiKeyMiddleware(req as Request, null, next);

      expect(next).toHaveBeenCalledWith(invalidKeyError);
    });
  });
});
