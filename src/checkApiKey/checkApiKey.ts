import type { Request, Response, NextFunction } from "express";
import authenticateApp from "../authenticateApp";
import type { CustomError } from "../types";

const checkApiKey =
  (targetApp: string, appToAuthenticate: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKeyHeader = "X-API-KEY";
    const apiKey = req.get(apiKeyHeader);

    try {
      if (!(await authenticateApp(targetApp, appToAuthenticate, apiKey))) {
        throw new Error("Invalid API key");
      }

      next();
    } catch (error: unknown) {
      (error as CustomError).statusCode = 401;

      next(error);
    }
  };

export default checkApiKey;
