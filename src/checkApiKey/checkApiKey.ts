import type { Request, Response, NextFunction } from "express";
import authenticateApp from "../authenticateApp";
import requestHeaders from "../utils/requestHeaders";
import apiKeyErrors from "../utils/errors";

const { invalidApiKeyError } = apiKeyErrors;

const checkApiKey =
  (targetApp: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get(requestHeaders.apiKey);
    const appToAuthenticate = req.get(requestHeaders.apiName);

    try {
      if (!(await authenticateApp(targetApp, appToAuthenticate, apiKey))) {
        throw invalidApiKeyError;
      }

      next();
    } catch (error: unknown) {
      next(error);
    }
  };

export default checkApiKey;
