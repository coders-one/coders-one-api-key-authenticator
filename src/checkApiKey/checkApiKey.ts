import type { Request, Response, NextFunction } from "express";
import authenticateApp from "../authenticateApp";
import type { CustomError } from "../types";
import requestHeaders from "../utils/requestHeaders";

const checkApiKey =
  (targetApp: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get(requestHeaders.apiKey);
    const appToAuthenticate = req.get(requestHeaders.apiName);

    try {
      if (!(await authenticateApp(targetApp, appToAuthenticate, apiKey))) {
        throw new Error("Invalid API key");
      }

      next();
    } catch (error: unknown) {
      (error as CustomError).statusCode = 401;
      (error as CustomError).publicMessage = (error as Error).message;

      next(error);
    }
  };

export default checkApiKey;
