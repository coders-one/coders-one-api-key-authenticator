// src/redis/redis.ts
import * as ioredis from "ioredis";

// src/loadEnvironments.ts
import dotenv from "dotenv";
dotenv.config();
var {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
} = process.env;
var environment = {
  redis: {
    host,
    port: +port,
    password,
  },
};

// src/redis/redis.ts
var { default: Redis } = ioredis;
var {
  redis: { host: host2, password: password2, port: port2 },
} = environment;
var redis = new Redis({ host: host2, password: password2, port: port2 });
var redis_default = redis;

// src/redis/getHash/getHash.ts
var getHash = async (targetApp, appToAuthenticate) => {
  const hash = await redis_default.hget(targetApp, appToAuthenticate);
  return hash;
};
var getHash_default = getHash;

// src/authenticateApp/authenticateApp.ts
import bcrypt from "bcryptjs";
var authenticateApp = async (
  targetApp,
  appToAuthenticate,
  keyToAuthenticate
) => {
  const hash = await getHash_default(targetApp, appToAuthenticate);
  if (!hash) {
    return false;
  }
  return bcrypt.compare(keyToAuthenticate, hash);
};
var authenticateApp_default = authenticateApp;

// src/utils/requestHeaders.ts
var requestHeaders = {
  apiName: "X-API-NAME",
  apiKey: "X-API-KEY",
};
var requestHeaders_default = requestHeaders;

// src/CustomError/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode, publicMessage) {
    super(message);
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
};
var CustomError_default = CustomError;

// src/utils/errors.ts
var apiKeyErrors = {
  invalidApiKeyError: new CustomError_default(
    "Invalid Api Key",
    401,
    "Invalid Api Key"
  ),
};
var errors_default = apiKeyErrors;

// src/checkApiKey/checkApiKey.ts
var { invalidApiKeyError } = errors_default;
var checkApiKey = (targetApp) => async (req, res, next) => {
  const apiKey = req.get(requestHeaders_default.apiKey);
  const appToAuthenticate = req.get(requestHeaders_default.apiName);
  try {
    if (
      !(await authenticateApp_default(targetApp, appToAuthenticate, apiKey))
    ) {
      throw invalidApiKeyError;
    }
    next();
  } catch (error) {
    next(error);
  }
};
var checkApiKey_default = checkApiKey;
export {
  authenticateApp_default as authenticateApp,
  checkApiKey_default as checkApiKey,
};
