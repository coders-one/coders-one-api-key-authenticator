import { Request, Response, NextFunction } from 'express';

declare const authenticateApp: (targetApp: string, appToAuthenticate: string, keyToAuthenticate: string) => Promise<boolean>;

declare const checkApiKey: (targetApp: string) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

export { authenticateApp, checkApiKey };
