import { Request, Response, NextFunction } from "express";

declare const authenticateApp: (
  targetApp: string,
  appToAuthenticate: string,
  hashToAuthenticate: string
) => Promise<boolean>;

declare const checkApiKey: (
  targetApp: string,
  appToAuthenticate: string
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

export { authenticateApp, checkApiKey };
