import type { Request, NextFunction, Response } from "express";
import checkApiKey from "./checkApiKey";
import appNames from "../utils/appNames";
import type { CustomError } from "../types";
import requestHeaders from "../utils/requestHeaders";

const { apiGateway, identityServer } = appNames;

const headers: Record<string, string> = {
  [requestHeaders.apiKey]: "key",
  [requestHeaders.apiName]: identityServer,
};

const req: Partial<Request> = {
  headers,

  get: jest.fn().mockImplementation((name: string) => headers[name]),
};

const next: NextFunction = jest.fn();

afterEach(() => jest.clearAllMocks());

describe("Given the middleware returned from checkApiKey invoked with targetApp 'api-gateway'", () => {
  describe("When it receives a request with headers X-API-KEY 'key' and X-API-NAME 'identity-server'", () => {
    test("Then it should invoke next with no parameters", async () => {
      const checkApiKeyMiddleware = checkApiKey(apiGateway);

      await checkApiKeyMiddleware(req as Request, {} as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the middleware returned from checkApiKey invoked with targetApp 'identity-server'", () => {
  describe("When it receives a request with headers X-API-KEY 'key' and X-API-NAME 'api-gateway'", () => {
    test("Then it should invoke next with an error with message 'Invalid API key' and statusCode 401", async () => {
      req.headers = { ...headers, [requestHeaders.apiKey]: apiGateway };
      const checkApiKeyMiddleware = checkApiKey(identityServer);
      const invalidKeyMessage = "Invalid API key";
      const invalidKeyError = new Error(invalidKeyMessage);
      (invalidKeyError as CustomError).statusCode = 401;

      await checkApiKeyMiddleware(req as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(invalidKeyError);
    });
  });
});
