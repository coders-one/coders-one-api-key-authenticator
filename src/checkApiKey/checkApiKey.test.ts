import type { Request, NextFunction, Response } from "express";
import checkApiKey from "./checkApiKey";
import appNames from "../utils/appNames";
import requestHeaders from "../utils/requestHeaders";
import apiKeyErrors from "../utils/errors";

const { apiGateway, identityServer } = appNames;
const { invalidApiKeyError } = apiKeyErrors;

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

      await checkApiKeyMiddleware(req as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(invalidApiKeyError);
    });
  });

  describe("When it receives a request with no api key nor app to authenticate ", () => {
    test("Then it should invoke next with an error with message 'Invalid API key'", async () => {
      const checkApiKeyMiddleware = checkApiKey(identityServer);

      req.get = jest.fn().mockReturnValue(undefined);

      await checkApiKeyMiddleware(req as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(invalidApiKeyError);
    });
  });
});
